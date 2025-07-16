<?php
session_start();
require_once 'config/db.php';

// Initialize cart if it doesn't exist
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = array();
}

// get the products from the db
try {
    $stmt = $pdo->query("SELECT * FROM products");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
    $products = array();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>wworkshop.studio</title>
    <link rel="stylesheet" href="shop_styles.css">
    <link rel="icon" type="image/jpg" href="favicon.png">
</head>

<body>
    <div class="logo-container">
        <img src="./assets/logos/wworkshopstudio_5@2x copy.png" alt="Workshop Studio Logo" class="logo">
    </div>


    <div class="wrapper">
        <div class="marquee-text">
            <div class="marquee-text-track" style="transform: translateX(-0%);">
                <h1>barbershop</h1>
                <h1>school</h1>
                <h1>consultancy</h1>
                <h1>barbershop</h1>
                <h1>school</h1>
                <h1>consultancy</h1>
                <h1>barbershop</h1>
                <h1>school</h1>
                <h1>consultancy</h1>
                <h1 aria-hidden="true">barbershop</h1>
                <h1 aria-hidden="true">school</h1>
                <h1 aria-hidden="true">consultancy</h1>
                <h1 aria-hidden="true">barbershop</h1>
                <h1 aria-hidden="true">school</h1>
                <h1 aria-hidden="true">consultancy</h1>
                <h1 aria-hidden="true">barbershop</h1>
                <h1 aria-hidden="true">school</h1>
                <h1 aria-hidden="true">consultancy</h1>
            </div>
        </div>
    </div>

    <nav class="navbar">
        <ul class="navbar-menu">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="calendar.html">Calendar</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="shop.html">Shop</a></li>
        </ul>
    </nav>

    <div class="shop-header">
        <h1>wworkshop grooming goods</h1>
    </div>

    <!-- shopdiv 1 stuff -->
    <div class="shopdiv">
        <div class="list">
            <?php foreach($products as $product): ?>
                <?php if($product['category'] == 'grooming'): ?>
                    <div class="item" 
                        data-images='<?php echo htmlspecialchars($product['images']); ?>'
                        data-description="<?php echo htmlspecialchars($product['description']); ?>"
                        data-price="P<?php echo number_format($product['price'], 2); ?>"
                        <?php if(!empty($product['types'])): ?>
                            data-types='<?php echo htmlspecialchars($product['types']); ?>'
                        <?php endif; ?>>
                        <img src="<?php echo htmlspecialchars(json_decode($product['images'])[0]); ?>" alt="<?php echo htmlspecialchars($product['name']); ?>">
                        <h2><?php echo htmlspecialchars($product['name']); ?></h2>
                        <p>Price: P<?php echo number_format($product['price'], 2); ?></p>
                    </div>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>
    </div>

    <div class="shop-header-2">
        <h1>xxx</h1>
    </div>

    <!-- shopdiv 2 stuff -->
    <div class="shopdiv" style="margin-top: -244px;">
        <div class="list">
            <div class="item" data-images='["./assets/logos/logo-1.png"]' data-description="xxx." data-price="0">
                <img src="./assets/logos/logo-1.png" alt="Product 1 preview">
                <h2>xxx</h2>
                <p>Price: Pxxx</p>
            </div>
            <div class="item" data-images='["./assets/logos/logo-1.png"]' data-description="xxx." data-price="0">
                <img src="./assets/logos/logo-1.png" alt="Product 1 preview">
                <h2>xxx</h2>
                <p>Price: Pxxx</p>
            </div>
            <div class="item" data-images='["./assets/logos/logo-1.png"]' data-description="xxx." data-price="0">
                <img src="./assets/logos/logo-1.png" alt="Product 1 preview">
                <h2>xxx</h2>
                <p>Price: Pxxx</p>
            </div>
            <div class="item" data-images='["./assets/logos/logo-1.png"]' data-description="xxx." data-price="0">
                <img src="./assets/logos/logo-1.png" alt="Product 1 preview">
                <h2>xxx</h2>
                <p>Price: Pxxx</p>
            </div>
            <div class="item" data-images='["./assets/logos/logo-1.png"]' data-description="xxx." data-price="0">
                <img src="./assets/logos/logo-1.png" alt="Product 1 preview">
                <h2>xxx</h2>
                <p>Price: Pxxx</p>
            </div>
        </div>
    </div>

    <!-- modal main -->
    <div id="modal" class="modal">
        <div class="modal-content">
            <span id="modal-close" class="modal-close">&times;</span>
            <h2 id="modal-title"></h2>
            <img id="modal-img" src="" alt="">
            <div>
                <button id="prev-btn">⟵</button>
                <button id="next-btn">⟶</button>
            </div>
            <p id="modal-desc"></p>
            <p id="modal-price" style="font-weight: bold;"></p>
            <div id="TYPE-picker" style="display: none; margin-top: 1rem;">
                <p style="margin-bottom: 0.5rem;">Select a type:</p>
                <div id="TYPE-options" style="display: flex; gap: 0.5rem; justify-content: center;"></div>
            </div>
            <div class="quantity-picker">
                <button class="quantity-btn" id="decrease-qty">-</button>
                <input type="number" id="quantity-input" value="1" min="1" max="10">
                <button class="quantity-btn" id="increase-qty">+</button>
            </div>
            <button class="add-to-cart">Add to Cart</button>
        </div>

    </div>

    <div class="cart">
        <img src="./assets/shop/cart.svg" alt="">
        <span id="cart-count" style="font-family: Inconsolata, monospace;">0</span>
    </div>

    <!-- cart modal thing -->
    <div id="cart-modal" class="modal">
        <div class="modal-content cart-content">
            <span id="cart-close" class="modal-close">&times;</span>
            <h2>Shopping Cart</h2>
            <div id="cart-items"></div>
            <div class="cart-total">
                <p>Total: <span id="cart-total-amount">P0</span></p>
                <button id="buy-now-btn" class="buy-now-button">Buy Now</button>
            </div>
        </div>
    </div>

    <!-- shows order status -->
    <div id="status-modal" class="modal">
        <div class="modal-content status-content">
            <span id="status-close" class="modal-close">&times;</span>
            <div id="status-message"></div>
        </div>
    </div>

    <script src="shop_script.js"></script>
</body>

</html>