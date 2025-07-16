<?php
session_start();
$_SESSION['user_id'] = 1; //i think martin meant this to be tied to a user based on some session stuff this 1 is just a temp
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

// Accept JSON input
$data = json_decode(file_get_contents('php://input'), true);

if (
    !isset($data['cart']) ||
    !is_array($data['cart']) ||
    empty($data['cart'])
) {
    die(json_encode(["success" => false, "message" => "Invalid or empty cart data."]));
}

$cart = $data['cart'];
$conn->begin_transaction();

try {
    //new order
    $order_sql = "INSERT INTO orders(user_id) VALUES(?)";
    $order_stmt = $conn->prepare($order_sql);
    $order_stmt->bind_param("i", $user_id);
    $order_stmt->execute();
    $order_id = $conn->insert_id;

    //insert order
    $item_sql = "INSERT INTO purchases (order_id, user_id, product_id, item, quantity, price)
                 VALUES (?, ?, ?, ?, ?, ?)";
    $item_stmt = $conn->prepare($item_sql);

    foreach ($cart as $item) {
        if (
            !isset($item['id']) ||  // product_id
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
            $item['id'],        // product_id from shop page's data-id
            $item['item'],      // item name
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
