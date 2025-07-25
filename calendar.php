<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>wworkshop.studio</title>
  <link rel="stylesheet" href="calendar_styles.css" />
</head>

<body>
  <div id="calendar-fade-overlay" style="
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
    <span style="color: #fff; font-size: 2rem; font-family: Inconsolata, monospace;">Set appointments!</span>
  </div>
  <script>
    // Fade out the overlay after 1.5 seconds
    window.addEventListener('DOMContentLoaded', function () {
      setTimeout(function () {
        var overlay = document.getElementById('calendar-fade-overlay');
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
      <li><a href="calendar.php" class="active">Calendar</a></li>
      <li><a href="services.php">Services</a></li>
      <li><a href="shop.php">Shop</a></li>
    </ul>
  </nav>

  <main>
    <div class="calendar-side-layout">
      <!-- Left side - Calendar -->
      <div class="calendar-section">
        <div class="calendar-container">
          <div class="calendar-header">
            <button id="prev-month" class="month-nav">&lt;</button>
            <h2 id="current-month"></h2>
            <button id="next-month" class="month-nav">&gt;</button>
          </div>
          <table id="calendar">
            <thead>
              <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
            </thead>
            <tbody>
              <!-- Calendar will be generated here -->
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right side - Appointment Info -->
      <div class="appointment-info">
        <button id="open-barber-modal" class="choose-barber-btn">Choose a Barber</button>

        <div class="appointment-details">
          <h3>Appointment Details</h3>
          <div class="info-item">
            <label>Selected Barber:</label>
            <span id="selected-barber-display">Not selected</span>
          </div>
          <div class="info-item">
            <label>Selected Date:</label>
            <span id="selected-date-display">Not selected</span>
          </div>
          <div class="info-item">
            <!-- <label>Selected Time:</label>
            <input type="time" id="time" name="time" required /> -->
            <div class="time-input-wrapper">
              <select id="time-input">
                <!-- all of this is js -->
              </select>
              <span id="selected-time-display">Not selected</span>
            </div>
          </div>
          <div class="info-item">
            <label>Selected Service:</label>
            <span id="selected-service-display">Not selected</span>
            <div id="service-options" style="margin-top: 0.5rem; display: flex; gap: 0.5rem;"></div>
          </div>
          <div class="info-item">
            <button id="confirm-booking" class="confirm-booking-btn" disabled>
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Barber List Modal -->
  <div id="barber-modal" class="modal">
    <div class="modal-content barber-list-modal">
      <h2>Choose Hair Consultant</h2>
      <ul class="barber-list">
        <li class="barber-item" data-barber="Martin">
          <img src="assets/barbers/martin.jpg" alt="Martin" class="barber-thumb">
          <div>
            <strong>Martin</strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <button class="view-portfolio-btn">Choose barber</button>
        </li>
        <li class="barber-item" data-barber="Dorothy">
          <img src="assets/barbers/dorothy.jpg" alt="Dorothy" class="barber-thumb">
          <div>
            <strong>Dorothy</strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <button class="view-portfolio-btn">Choose barber</button>
        </li>
        <li class="barber-item" data-barber="Asterio">
          <img src="assets/barbers/asterio.jpg" alt="Asterio" class="barber-thumb">
          <div>
            <strong>Asterio</strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <button class="view-portfolio-btn">Choose barber</button>
        </li>
        <li class="barber-item" data-barber="Gylliane">
          <img src="assets/barbers/gylliane.jpg" alt="Gylliane" class="barber-thumb">
          <div>
            <strong>Gylliane</strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <button class="view-portfolio-btn">Choose barber</button>
        </li>
        <!-- Add more barbers as needed -->
      </ul>
      <button class="modal-close" id="close-barber-modal">&times;</button>
    </div>
  </div>
  <div id="modal-backdrop" class="modal-backdrop"></div>

  <!-- Barber Portfolio Modal -->
  <div id="portfolio-modal" class="modal">
    <div class="modal-content portfolio-modal-content">
      <div class="portfolio-header">
        <img id="portfolio-barber-img" src="" alt="Barber" class="portfolio-barber-img">
        <div>
          <h2 id="portfolio-barber-name"></h2>
          <p id="portfolio-barber-bio"></p>
        </div>
      </div>
      <div class="portfolio-gallery">
        <button id="choose-barber-btn" class="choose-barber-btn">Choose Barber</button>
        <button class="modal-close" id="close-portfolio-modal">&times;</button>
      </div>ton id="choose-barber-btn" class="choose-barber-btn">Choose Barber</button>
    </div>utton class="modal-close" id="close-portfolio-modal">&times;</button>
  </div>

  <!-- Booking Modal -->
  <div id="booking-modal" class="modal">
    <div class="modal-content booking-modal-content">
      <button class="modal-close" id="close-booking-modal">&times;</button>
      <h2>Book Appointment</h2>
      <form id="booking-form" action="connect.php" method="POST">
        <div>
          <label>Barber:</label>
          <span id="booking-barber"></span>
          <input type="hidden" id="barber-input" name="name" required>
        </div>
        <div>
          <label>Date:</label>
          <span id="booking-date"></span>
          <input type="hidden" id="date-input" name="date" required>
        </div>
        <label for="time">Time:</label>
        <label for="time">Preferred Time:</label>
        <input type="time" id="time" name="time" required />
        </select>
        <button type="submit" class="submit-btn">Confirm Booking</button>
      </form>
    </div>
  </div>

  <!-- Success Modal -->
  <div id="success-modal" class="modal">
    <div class="modal-content">
      <span class="close-success-btn">&times;</span>
      <h3>Appointment Confirmed!</h3>
      <p>Your appointment has been booked successfully.</p>
    </div>
  </div>

  <!-- errors -->
  <div id="error-modal" class="modal">
    <div class="modal-content error-modal-content">
      <h2>Notice</h2>
      <p id="error-message"></p>
      <button class="close-error-btn">OK</button>
    </div>
  </div>
  <!-- make a new modal! this one is to show a new calendar? or at least a complete list of schedules based on get_availability! -->
  <div id="schedule-modal" class="modal">
    <div class="schedule-modal-content">
      <button class="modal-close" id="close-schedule-modal">&times;</button>
      <h2>Available Bookings</h2>
      <div id="schedule-content">
        <!-- This will be populated with bookings -->
        <p class="loading">Loading...</p>
      </div>
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

  <script src="calendar_script.js"></script>

</body>

</html>
