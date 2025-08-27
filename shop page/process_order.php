<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

// Database connection
$host = "localhost";
$username = "root";
$password = "";
$database = "wworkshopdb";

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

//  Ensure user is logged in
if (!isset($_SESSION['user_logged_in']) || !isset($_SESSION['user_username'])) {
    die(json_encode(["success" => false, "message" => "User not logged in."]));
}

//  Get user ID from username
$user_stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
$user_stmt->bind_param("s", $_SESSION['user_username']);
$user_stmt->execute();
$user_stmt->bind_result($user_id);
$user_stmt->fetch();
$user_stmt->close();

if (!$user_id) {
    die(json_encode(["success" => false, "message" => "User not found in database."]));
}

// Check proof of payment
if (!isset($_FILES['proof']) || $_FILES['proof']['error'] !== UPLOAD_ERR_OK) {
    die(json_encode(["success" => false, "message" => "Proof of payment image is missing or failed to upload."]));
}

//  Check and decode cart
if (!isset($_POST['cart'])) {
    die(json_encode(["success" => false, "message" => "Cart data not received."]));
}

$cart = json_decode($_POST['cart'], true);
if (!is_array($cart) || empty($cart)) {
    die(json_encode(["success" => false, "message" => "Cart is invalid or empty."]));
}

//  Handle image upload
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

//  Proceed to insert order and purchases
$conn->begin_transaction();

try {
    // Insert into orders table
    $order_sql = "INSERT INTO orders (user_id, proof_image) VALUES (?, ?)";
    $order_stmt = $conn->prepare($order_sql);
    $order_stmt->bind_param("is", $user_id, $filename);
    $order_stmt->execute();
    $order_id = $conn->insert_id;

    // Insert each item into purchases table
    $item_sql = "INSERT INTO purchases (order_id, user_id, product_id, item, quantity, price)
                 VALUES (?, ?, ?, ?, ?, ?)";
    $item_stmt = $conn->prepare($item_sql);

    foreach ($cart as $item) {
        if (
            !isset($item['id']) ||
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
            $item['id'],
            $item['item'],
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
