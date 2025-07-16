<?php
session_start();
$_SESSION['user_id'] = 1; // 🔧 TEMP: Simulate logged-in user

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

$host = "localhost";
$username = "root";
$password = "";
$database = "wworkshopdb";

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

if (!isset($_SESSION['user_id'])) {
    die(json_encode(["success" => false, "message" => "User not logged in."]));
}

$user_id = $_SESSION['user_id'];

// ⛔ Check proof file
if (!isset($_FILES['proof']) || $_FILES['proof']['error'] !== UPLOAD_ERR_OK) {
    die(json_encode(["success" => false, "message" => "Proof of payment image is missing or failed to upload."]));
}

// ⛔ Check and decode cart
if (!isset($_POST['cart'])) {
    die(json_encode(["success" => false, "message" => "Cart data not received."]));
}

$cart = json_decode($_POST['cart'], true);
if (!is_array($cart) || empty($cart)) {
    die(json_encode(["success" => false, "message" => "Cart is invalid or empty."]));
}

// ✅ Handle image upload
$uploadDir = "uploads/";
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$ext = pathinfo($_FILES['proof']['name'], PATHINFO_EXTENSION);
$filename = uniqid("proof_") . '.' . $ext;
$targetPath = $uploadDir . $filename;

if (!move_uploaded_file($_FILES['proof']['tmp_name'], $targetPath)) {
    die(json_encode(["success" => false, "message" => "Failed to save proof image."]));
}

// ✅ Proceed to insert
$conn->begin_transaction();

try {
    // Insert order with proof image
    $order_sql = "INSERT INTO orders (user_id, proof_image) VALUES (?, ?)";
    $order_stmt = $conn->prepare($order_sql);
    $order_stmt->bind_param("is", $user_id, $filename);
    $order_stmt->execute();
    $order_id = $conn->insert_id;

    // Insert each purchase item
    $item_sql = "INSERT INTO purchases (order_id, user_id, product_id, item, quantity, price)
                 VALUES (?, ?, ?, ?, ?, ?)";
    $item_stmt = $conn->prepare($item_sql);

    foreach ($cart as $item) {
        if (
            !isset($item['id']) || // product_id
            !isset($item['item']) ||
            !isset($item['quantity']) ||
            !isset($item['price'])
        ) {
            throw new Exception("Cart item missing fields.");
        }

        $item_stmt->bind_param(
            "iiisid",
            $order_id,
            $user_id,
            $item['id'],      // product_id
            $item['item'],    // item name
            $item['quantity'],
            $item['price']
        );
        $item_stmt->execute();
    }

    $conn->commit();
    echo json_encode(["success" => true, "message" => "Order saved!", "order_id" => $order_id]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["success" => false, "message" => "Order failed: " . $e->getMessage()]);
}

$conn->close();
?>
