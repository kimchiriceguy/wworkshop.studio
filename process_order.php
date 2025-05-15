<?php
session_start();
require_once 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$cart = $data['cart'] ?? [];

if (empty($cart)) {
    echo json_encode(['success' => false, 'message' => 'Cart is empty']);
    exit;
}

error_log("Cart received: " . print_r($cart, true));
error_log("Raw input: " . file_get_contents('php://input'));

try {
    $pdo->beginTransaction();

    $total = 0;
    foreach ($cart as $item) {
        $total += $item['price'] * $item['quantity'];
    }
    $stmt = $pdo->prepare("INSERT INTO orders (order_date, total_amount) VALUES (NOW(), ?)");
    $stmt->execute([$total]);
    $orderId = $pdo->lastInsertId();

    $stmt = $pdo->prepare("INSERT INTO order_items (order_id, product_name, quantity, price) VALUES (?, ?, ?, ?)");
    foreach ($cart as $item) {
        $stmt->execute([
            $orderId,
            $item['name'],
            $item['quantity'],
            $item['price']
        ]);
    }

    $pdo->commit();
    echo json_encode(['success' => true, 'message' => 'Order saved!']);
} catch (Exception $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    error_log("Order error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'database error']);
}
?>

<script>
    console.log('Cart before sending:', cart);
    console.log('Cart in sessionStorage:', sessionStorage.getItem('cart'));
    console.log('Server response:', result);
</script>