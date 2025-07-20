<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>wworkshop.studio</title>
    <link rel="stylesheet" href="homestyles.css">
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
                <span id="login-status" style="display: flex; align-items: center; gap: 10px; color: white;">
                <?php if (isset($_SESSION['user_logged_in'])): ?>
                    Welcome, <strong style="color: white;"><?= htmlspecialchars($_SESSION['user_username'])?></strong>! 
                    <a href="user_dashboard.php?tab=account" style="margin-left: 10px; color: white;">Account</a>
                    <a href="logout.php" style="margin-left: 10px; color: white;">Logout</a>
                <?php else: ?>
                    <a href="admin_login.html" style="color: white;">Login</a>
                <?php endif; ?>
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

    <!-- barber pole
    <div class="barberpole">
        <video id="barberpole" autoplay muted playsinline>
            <source src="./assets/videos/barberpole.gif" >
            Browser does not support video tag.
        </video>
    </div> -->

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

    <div class="disappearer">

    </div>

    <div class="blur-container">
        <div class="introtext">
            <p>welcome to wworkshop.studio</p>
            <p class="scroll-text">scroll down</p>
        </div>
        <div class="blur-trigger"></div>
    </div>

    <!--carousel-->
    <div class="carousel">
        <!-- slides -->
        <div class="list">
            <div class="item active">
                <div class="content">
                    <div class="text">
                        <h1>wworkshop.studio</h1>
                        <div class="content-images">
                            <img src="./assets/homepage/1.jpg" class="content-img">
                            <img src="./assets/homepage/2.jpg" class="content-img">
                        </div>
                        <!-- <p>barbershop</p>
                        <p>school</p> -->
                        <p>Located in the heart of Cebu City, WWORKSHOP.STUDIO is an independent, barber-owned and
                            operated barbershop and barberschool. We deliver precision cuts, timeless styles, and a
                            personalized grooming experience — while also shaping the next generation of skilled
                            barbers.</p>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="content">
                    <div class="buttons">
                        <button>HOME</button>
                        <button>ABOUT</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- thumbnails -->
        <div class="thumbnail">
            <div class="item">
                <a href="about.html">
                    <img src="./assets/images/homepage2.jpg" alt="Thumbnail Image">
                </a>
            </div>
        </div>

        <!-- timer bar -->
        <div class="time"></div>
    </div>

    <nav class="navbar">
        <ul class="navbar-menu">
            <li><a href="index.php">Home</a></li>
            <li><a href="about.php">About</a></li>
            <li><a href="calendar.php">Calendar</a></li>
            <li><a href="services.php">Services</a></li>
            <li><a href="shop.php">Shop</a></li>
        </ul>
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
    </nav>

    <!-- background video that plays on hover -->
    <video class="background-video" autoplay muted loop playsinline id="background-video">
        <source src="./assets/videos/vid1.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>


    <script src="homeapp.js"></script>
</body>

</html>