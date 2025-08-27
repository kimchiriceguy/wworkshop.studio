<?php
session_start();
require_once 'config/db.php';

class Products {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getAllProducts() {
        $stmt = $this->pdo->prepare("SELECT * FROM products");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getProduct($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM products WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}

// Handle AJAX requests
if (isset($_GET['action'])) {
    $products = new Products($pdo);
    
    switch ($_GET['action']) {
        case 'get_products':
            echo json_encode($products->getAllProducts());
            break;
            
        case 'get_product':
            if (isset($_GET['id'])) {
                echo json_encode($products->getProduct($_GET['id']));
            }
            break;
    }
}
?>
