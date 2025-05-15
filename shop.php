<?php
session_start();
require_once 'config/db.php';
require_once 'products.php';

$products = new Products($pdo);
$allProducts = $products->getAllProducts();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>wworkshop.studio - Shop</title>
    <link rel="stylesheet" href="shop_styles.css">
    <link rel="icon" type="image/jpg" href="favicon.png">
</head>
<body>
    <!-- Keep your existing HTML structure -->
    <div class="logo-container">
        <img src="./assets/logos/wworkshopstudio_5@2x copy.png" alt="Workshop Studio Logo" class="logo">
    </div>

    <div class="wrapper">
        <!-- ...existing marquee code... -->
    </div>

    <nav class="navbar">
        <!-- ...existing navigation... -->
    </nav>

    <div class="shop-header">
        <h1>wworkshop grooming goods</h1>
    </div>

    <!-- shopdiv 1 stuff -->
    <div class="shopdiv">
        <div class="list">
            <?php foreach($allProducts as $product): ?>
            <div class="item" 
                data-id="<?php echo htmlspecialchars($product['id']); ?>"
                data-images='<?php echo htmlspecialchars(json_encode(explode(',', $product['image_path']))); ?>'
                data-description="<?php echo htmlspecialchars($product['description']); ?>"
                data-price="<?php echo htmlspecialchars($product['price']); ?>">
                <img src="<?php echo htmlspecialchars(explode(',', $product['image_path'])[0]); ?>" alt="<?php echo htmlspecialchars($product['name']); ?> preview">
                <h2><?php echo htmlspecialchars($product['name']); ?></h2>
                <p>Price: P<?php echo number_format($product['price'], 2); ?></p>
            </div>
            <?php endforeach; ?>
        </div>
    </div>

    <!-- Product Modal -->
    <div id="product-modal" class="modal">
        <!-- ...existing modal structure... -->
    </div>

    <!-- Cart -->
    <div class="cart">
        <img src="./assets/shop/cart.svg" alt="">
        <span id="cart-count"><?php echo isset($_SESSION['cart']) ? array_sum(array_column($_SESSION['cart'], 'quantity')) : 0; ?></span>
    </div>

    <!-- Cart Modal -->
    <div id="cart-modal" class="modal">
        <!-- ...existing cart modal structure... -->
    </div>

    <script>
    // Update your shop_script.js to use PHP endpoints
    const addToCart = async (productId, quantity = 1, type = null) => {
        try {
            const formData = new FormData();
            formData.append('action', 'add');
            formData.append('product_id', productId);
            formData.append('quantity', quantity);
            if (type) formData.append('type', type);

            const response = await fetch('cart.php', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            document.getElementById('cart-count').textContent = data.count;
            return data;
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    // Add more JavaScript functions for cart operations...
    </script>
</body>
</html>
