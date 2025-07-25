<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>wworkshop.studio</title>
    <link rel="stylesheet" href="styles_about.css">
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
                    <a href="user_dashboard.php" style="margin-left: 10px; color: white;">Account</a>
                    <a href="logout.php" style="margin-left: 10px; color: white;">Logout</a>
                <?php else: ?>
                    <a href="admin_login.html" style="color: white;">Login</a>
                <?php endif; ?>
    </div>

    <!-- social media logos (old, can be removed if not needed) -->
    <!-- <a href="https://www.instagram.com/wworkshop.studio/" target="_blank" class="fb">
        <img src="./assets/logos/facebook-circle.svg" alt="facebook Logo" class="social-logo">
    </a>
    <a href="https://www.instagram.com/wworkshop.studio/" target="_blank" class="ig">
        <img src="./assets/logos/instagram-svgrepo-com.svg" alt="Instagram Logo" class="social-logo">
    </a> -->


    <div class="logo-container">
        <a href="index.php">
            <img src="./assets/logos/wworkshopstudio_5@2x copy.png" alt="Workshop Studio Logo" class="logo" id="logo">
        </a>
    </div>
    <!-- <script>
        const logo = document.getElementById("logo");
        const logos = [
            "./assets/logos/logo2 white.png",
            "./assets/logos/logo-1.png"
        ];

        let index = 0;

        setInterval(() => {
            logo.classList.add("fade-out");

            setTimeout(() => {
                index = (index + 1) % logos.length;
                logo.src = logos[index];
                logo.classList.remove("fade-out");
            }, 500); // 0.5s = matches CSS opacity transition
        }, 5000);
    </script> -->



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
    <script>
        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        window.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.marquee-text-track h1').forEach(item => {
                const originalColor = getComputedStyle(item).color;

                item.addEventListener('click', () => {
                    const newColor = getRandomColor();

                    // Set CSS variable on the element to new color
                    item.style.setProperty('--clicked-color', newColor);
                    // Add class to trigger CSS color change
                    item.classList.add('clicked');

                    // Remove class after 2.5 seconds to fade back
                    setTimeout(() => {
                        item.classList.remove('clicked');
                    }, 2500);
                });
            });
        });

    </script>

    <!-- <nav class="navbar">
        <ul class="navbar-menu">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="calendar.html">Calendar</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="shop.html">Shop</a></li>
        </ul>
    </nav> -->

    <div class="text">
        <div class="header">
            <p class="dynamic_text">
                <span>w</span>
                <span>h</span>
                <span>o </span>
                <span> </span>
                <span>a</span>
                <span>r</span>
                <span>e </span>
                <span> </span>
                <span>w</span>
                <span>e</span>
                <span>?</span>
            </p>

            <!-- <p class="clickme">
                click the text.
            </p> -->
        </div>
        <!-- <p style="font-size: medium;">== Our Story ==<br><br>
            WWORKSHOP.STUDIO was founded with a simple mission: to provide top-notch grooming
            services in a welcoming environment. As a barber-owned and operated establishment,
            we take pride in our independence and dedication to the art of barbering.<br><br>
            == Our Philosophy ==<br><br>
            We believe that a great haircut can transform not just your appearance but your
            confidence. Our team is committed to continuous learning and staying updated with
            the latest trends to offer you the best service possible.<br><br>
            Beyond the chair, we engage with our community through events, collaborations,
            and exclusive product launches.</p> -->
    </div>


    <!-- Background video that plays on hover -->
    <video class="background-video" autoplay muted loop playsinline id="background-video">
        <source src="./assets/videos/4years.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>

    <script src="about.js"></script>
</body>

</html>