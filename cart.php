<?php
session_start();
require_once 'config/db.php';

class Cart {
    public function __construct() {
        if (!isset($_SESSION['cart'])) {
            $_SESSION['cart'] = [];
        }
    }

    public function addToCart($product_id, $quantity = 1, $type = null) {
        $key = $product_id . ($type ? '-' . $type : '');
        
        if (isset($_SESSION['cart'][$key])) {
            $_SESSION['cart'][$key]['quantity'] += $quantity;
        } else {
            $_SESSION['cart'][$key] = [
                'product_id' => $product_id,
                'quantity' => $quantity,
                'type' => $type
            ];
        }
        
        return $this->getCartCount();
    }

    public function removeFromCart($product_id, $type = null) {
        $key = $product_id . ($type ? '-' . $type : '');
        if (isset($_SESSION['cart'][$key])) {
            unset($_SESSION['cart'][$key]);
        }
        return $this->getCartCount();
    }

    public function getCart() {
        return $_SESSION['cart'];
    }

    public function getCartCount() {
        $count = 0;
        foreach ($_SESSION['cart'] as $item) {
            $count += $item['quantity'];
        }
        return $count;
    }

    public function updateQuantity($product_id, $quantity, $type = null) {
        $key = $product_id . ($type ? '-' . $type : '');
        if (isset($_SESSION['cart'][$key])) {
            $_SESSION['cart'][$key]['quantity'] = $quantity;
        }
        return $this->getCartCount();
    }

    public function clearCart() {
        $_SESSION['cart'] = [];
        return 0;
    }
}

// Handle AJAX requests
if (isset($_POST['action'])) {
    $cart = new Cart();
    
    switch ($_POST['action']) {
        case 'add':
            $count = $cart->addToCart(
                $_POST['product_id'], 
                $_POST['quantity'] ?? 1,
                $_POST['type'] ?? null
            );
            echo json_encode(['count' => $count]);
            break;
            
        case 'remove':
            $count = $cart->removeFromCart(
                $_POST['product_id'],
                $_POST['type'] ?? null
            );
            echo json_encode(['count' => $count]);
            break;
            
        case 'update':
            $count = $cart->updateQuantity(
                $_POST['product_id'],
                $_POST['quantity'],
                $_POST['type'] ?? null
            );
            echo json_encode(['count' => $count]);
            break;
            
        case 'get':
            echo json_encode([
                'items' => $cart->getCart(),
                'count' => $cart->getCartCount()
            ]);
            break;
            
        case 'clear':
            echo json_encode(['count' => $cart->clearCart()]);
            break;
    }
}
?>
