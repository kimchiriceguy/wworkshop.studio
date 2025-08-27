<?php



session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Connect to database
$host = "localhost";
$username = "root";
$password = "";
$database = "wworkshopdb";

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = trim($_POST['username']);
    $email = trim($_POST['email']);
    $phone = trim($_POST['phone']);
    $pass = $_POST['password'];
    $confirm = $_POST['confirmPassword'];

    // Basic validation
    if ($pass !== $confirm) {
        header("Location: register.html?error=" . urlencode("Passwords do not match."));
        exit();
    }

    // Check if username or email already exists
    $check = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
    $check->bind_param("ss", $user, $email);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        $check->close();
        header("Location: register.html?error=" . urlencode("Username or email already exists."));
        exit();
    }
    $check->close();

    // Hash password
    $hashedPassword = password_hash($pass, PASSWORD_DEFAULT);

    // Insert into users table
    $stmt = $conn->prepare("INSERT INTO users (username, password, email, phone) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $user, $hashedPassword, $email, $phone);

if ($stmt->execute()) {
    $stmt->close();
    header("Location: admin_login.html");
    exit();
} else {
    file_put_contents("db_error.txt", $stmt->error);  // 👈 log the error
    $stmt->close();
    header("Location: register.html?error=" . urlencode("Registration failed. Please try again."));
    exit();
}
}
?>