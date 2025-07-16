<?php
session_start();

$host = "localhost";
$username = "root";
$password = "";
$database = "wworkshopdb";

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputUsername = $_POST['username'];
    $inputPassword = $_POST['password'];

    // Fetch user from admin_users
    $stmt = $conn->prepare("SELECT id, username, password FROM admin_users WHERE username = ?");
    $stmt->bind_param("s", $inputUsername);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($id, $username, $dbPassword);
        $stmt->fetch();

        // Plain text comparison (not secure)
        if ($inputPassword === $dbPassword) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_username'] = $username;
            header("Location: admin_dashboard.php");
            exit();
        }
    }

    $stmt->close();

    // If login fails
    header("Location: admin_login.html?error=1");
    exit();
}
?>