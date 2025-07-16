<?php
session_start();

// Destroy all session variables
session_unset();

// Destroy the session
session_destroy();

// Clear the session cookie
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time() - 3600, '/');
}

// Redirect to login page or home page
header("Location: user_login.html");
exit();
?>