<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>wworkshop.studio</title>
  <link rel="stylesheet" href="services_styles.css">
  <link rel="icon" type="image/jpg" href="favicon.png">
</head>

<body>

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
                <span id="login-status" style="color: white;">
                    <?php if (isset($_SESSION['user_logged_in'])): ?>
                        Welcome, <strong style="color: white;"><?= htmlspecialchars($_SESSION['user_username']) ?></strong>! 
                        <a href="user_dashboard.php" style="margin-left: 10px; color: white;">Account</a>
                        <a href="logout.php" style="margin-left: 10px; color: white;">Logout</a>
                    <?php else: ?>
                        <a href="admin_login.html" style="color: white;">Login</a>
                    <?php endif; ?>
                </span>
    </span>
  </div>

  <div class="logo-container">
    <img src="./assets/logos/wworkshopstudio_5@2x copy.png" alt="Workshop Studio Logo" class="logo">
  </div>

  <div class="splash">
    <video id="splashscreen" autoplay muted playsinline>
      <source src="./assets/videos/wworkshopstudio_SPLASH.mp4" type="video/mp4">
      Browser does not support video tag.
    </video>
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
        <h1 aria-hidden="true">consultancy</h1>s
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

  <!-- services related html -->
  <div class="services-container">
    <div class="service-modal" onclick="window.location.href='calendar.php'">
      <h2>Barbershop</h2>
      <p>Cut. Style. Fade.</p>
    </div>
    <div class="service-modal" onclick="window.location.href='calendar.php'">
      <h2>School</h2>
      <p>Learn the craft.</p>
    </div>
    <div class="service-modal" onclick="window.location.href='calendar.php'">
      <h2>Consultancy</h2>
      <p>Grow your business.</p>
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


  <script src="homeapp.js"></script>
</body>

</html>