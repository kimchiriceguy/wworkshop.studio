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

    // this is for users
    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $inputUsername);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($id, $username, $hashedPassword);
        $stmt->fetch();

        if (password_verify($inputPassword, $hashedPassword)) {
            $_SESSION['user_logged_in'] = true;
            $_SESSION['user_username'] = $username;
            header("Location: index.php");
            exit();
        }
    }
    $stmt->close();

    // If login fails, redirect back with error
    header("Location: user_login.html?error=1");
    exit();
}
?>