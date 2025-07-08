<?php
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

$sql = "INSERT INTO purchases (item, quantity, price) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    die(json_encode(["success" => false, "message" => "Prepare failed: " . $conn->error]));
}

foreach ($cart as $item) {
    if (
        !isset($item['name']) ||
        !isset($item['quantity']) ||
        !isset($item['price'])
    ) {
        die(json_encode(["success" => false, "message" => "Cart item missing fields."]));
    }
    $stmt->bind_param("sid", $item['name'], $item['quantity'], $item['price']);
    if (!$stmt->execute()) {
        die(json_encode(["success" => false, "message" => "Insert failed: " . $stmt->error]));
    }
}

echo json_encode(["success" => true, "message" => "Order saved!"]);

$stmt->close();
$conn->close();
?>