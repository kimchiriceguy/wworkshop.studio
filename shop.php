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
    <div id="shop-fade-overlay" style="
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.7);
    z-index: 99999;
    pointer-events: auto;
    transition: opacity 0.6s;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
">
        <span style="color: #fff; font-size: 2rem; font-family: Inconsolata, monospace;">Welcome to the Shop</span>
    </div>
    <script>
        // Fade out the overlay after 1.5 seconds
        window.addEventListener('DOMContentLoaded', function () {
            setTimeout(function () {
                var overlay = document.getElementById('shop-fade-overlay');
                overlay.style.opacity = '0';
                setTimeout(function () {
                    overlay.style.display = 'none';
                }, 700); // Wait for the fade transition to finish
            }, 700);
        });
    </script>

    <div class="logo-container">
        <img src="./assets/logos/wworkshopstudio_5@2x copy.png" alt="Workshop Studio Logo" class="logo">
    </div>

    <div class="topright-bar">
        <a href="https://www.facebook.com/wworkshop.studio" target="_blank" title="Facebook">
            <img src="./assets/logos/facebook-circle.svg" alt="Facebook">
        </a>
        <a href="https://www.instagram.com/wworkshop.studio/" target="_blank" title="Instagram">
            <img src="./assets/logos/instagram-svgrepo-com.svg" alt="Instagram">
        </a>
                <?php
                session_start();
                ?>
                <span id="login-status" style="display: flex; align-items: center; gap: 10px; color: white;">
                <?php if (isset($_SESSION['user_logged_in'])): ?>
                    Welcome, <strong style="color: white;"><?= htmlspecialchars($_SESSION['user_username'])?></strong>! 
                    <a href="user_dashboard.php" style="margin-left: 10px; color: white;">Account</a>
                    <a href="logout.php" style="margin-left: 10px; color: white;">Logout</a>
                <?php else: ?>
                    <a href="admin_login.html" style="color: white;">Login</a>
                <?php endif; ?>
                </span>
        </span>
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
            <li><a href="index.php">Home</a></li>
            <li><a href="about.php">About</a></li>
            <li><a href="calendar.php">Calendar</a></li>
            <li><a href="services.php">Services</a></li>
            <li><a href="shop.php">Shop</a></li>
        </ul>
    </nav>

    <div class="shop-header">
        <h1 style="display: inline-flex;">wworkshop grooming goods</h1>
        <h1 style="display: inline-flex; margin-left: 50vw;">
    </div>

    <!-- shopdiv 1 stuff -->
    <div class="shopdiv">
        <div class="list">
            <div class="item"
                data-id="1"
                data-images='["./assets/shop/prod1/1.jpg", "./assets/shop/prod1/2.webp", "./assets/shop/prod1/3.webp", "./assets/shop/prod1/4.webp", "./assets/shop/prod1/5.webp"]'
                data-description="DUST VOLUME POWDER adds volume and texture to all hair types and lengths with a natural, matte finish."
                data-price="P380">
                <img src="./assets/shop/prod1/1.jpg" alt="Product 1 preview">
                <h2>DUST VOLUME POWER</h2>
                <p>Price: P380</p>
            </div>
            <div class="item"
                data-id="2"
                data-images='["./assets/shop/prod2/1.jpg", "./assets/shop/prod2/2.webp", "./assets/shop/prod2/3.webp", "./assets/shop/prod2/4.webp", "./assets/shop/prod2/5.webp"]'
                data-description="Create a loose, lived in look with ease or to be used as a pre-styling product when blow drying."
                data-price="P420">
                <img src="./assets/shop/prod2/1.jpg" alt="Product 2 preview">
                <h2>SEA SALT TEXTURE SPRAY</h2>
                <p>Price: P420</p>
            </div>
            <div class="item"
                data-id="3"
                data-images='["./assets/shop/prod3/1.jpg", "./assets/shop/prod3/2.webp", "./assets/shop/prod3/3.webp", "./assets/shop/prod3/4.webp", "./assets/shop/prod3/5.webp"]'
                data-description="Original Water-based Pomade has been designed for the discerning guy who has a particular style in mind. Perfect for timeless, classic looks – such as high pompadours, side parts, and slick backs."
                data-price="P480" data-types='["NOMAD", "FURY", "REVOLT"]'>
                <img src="./assets/shop/prod3/1.jpg" alt="Product 2 preview">
                <h2>ORIGINAL WATER-BASED POMADE</h2>
                <p>Price: P480</p>
            </div>
            <div class="item" 
                data-id="4"
                data-images='["./assets/logos/logo-1.png"]' data-description="xxx." data-price="0">
                <img src="./assets/logos/logo-1.png" alt="Product 1 preview">
                <h2>xxx</h2>
                <p>Price: Pxxx</p>
            </div>
            <div class="item" 
                data-id="5"
                data-images='["./assets/logos/logo-1.png"]' data-description="xxx." data-price="0">
                <img src="./assets/logos/logo-1.png" alt="Product 1 preview">
                <h2>xxx</h2>
                <p>Price: Pxxx</p>
            </div>
            <div class="item" 
                data-id="6"
                data-images='["./assets/logos/logo-1.png"]' data-description="xxx." data-price="0">
                <img src="./assets/logos/logo-1.png" alt="Product 1 preview">
                <h2>xxx</h2>
                <p>Price: Pxxx</p>
            </div>
            <div class="item" 
                data-id="7"
                data-images='["./assets/logos/logo-1.png"]' data-description="xxx." data-price="0">
                <img src="./assets/logos/logo-1.png" alt="Product 1 preview">
                <h2>xxx</h2>
                <p>Price: Pxxx</p>
            </div>
        </div>
    </div>

    <!--     <div class="shop-header-2">
        <h1>xxx</h1>
    </div> -->

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
        <form id="order-form" enctype="multipart/form-data">
        <div class="cart-total" style="text-align: center;">
        <p>Total: <span id="cart-total-amount">P0</span></p>

        <div class="qr-section" style="margin: 1rem 0; text-align: center;">
            <p><strong>Scan this QR Code to pay:</strong></p>
            <img src="assets/qr/sample_qr.jpg" alt="Payment QR Code"
                 style="max-width: 200px; border: 1px solid #ccc; border-radius: 6px;">
        </div>

        <label for="proof-upload" style="display: block; margin-top: 1rem;">Upload Proof of Payment:</label>
        <input type="file" id="proof-upload" name="proof" accept="image/*" required
               style="margin-bottom: 1rem;">

        <button type="submit" class="buy-now-button">Confirm Order</button>
    </div>
</form>
        </div>
    </div>

    <!-- shows order status -->
    <div id="status-modal" class="modal">
        <div class="modal-content status-content">
            <span id="status-close" class="modal-close">&times;</span>
            <div id="status-message"></div>
        </div>
    </div>

    <div class="search-container">
        <input type="text" class="search-input" placeholder="Search...">
        <button class="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        </button>
    </div>

    <script src="shop_script.js"></script>
</body>

</html>