<?php
session_start();

$host = "localhost";
$username = "root";
$password = "";
$database = "test2calendar";

// Connect to DB
$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputUsername = $_POST['username'];
    $inputPassword = $_POST['password'];

    // Prepare statement
    $stmt = $conn->prepare("SELECT id, username, password FROM admin_users WHERE username = ?");
    $stmt->bind_param("s", $inputUsername);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($id, $username, $hashedPassword);
        $stmt->fetch();

        // Verify password
        if (password_verify($inputPassword, $hashedPassword)) {
            // Correct login
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_username'] = $username;
            header("Location: admin_dashboard.php");
            exit();
        }
    }

    // If we get here, login failed
    header("Location: admin_login.html?error=1");
    exit();
}
?>
