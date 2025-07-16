<?php
session_start();

// DB config
$host = 'localhost';
$dbname = 'wworkshopdb';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Validation functions
function validatePassword($password) {
    $errors = [];
    if (strlen($password) < 8) $errors[] = "Password must be at least 8 characters long";
    if (!preg_match('/[A-Z]/', $password)) $errors[] = "Must contain an uppercase letter";
    if (!preg_match('/[a-z]/', $password)) $errors[] = "Must contain a lowercase letter";
    if (!preg_match('/[0-9]/', $password)) $errors[] = "Must contain a number";
    return $errors;
}

function validatePhone($phone) {
    $phone = preg_replace('/[^0-9]/', '', $phone);
    return preg_match('/^(63|0)9[0-9]{9}$/', $phone);
}

function sanitizeInput($data) {
    return htmlspecialchars(trim($data));
}

// Handle POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $errors = [];

    $username = sanitizeInput($_POST['username'] ?? '');
    $email = sanitizeInput($_POST['email'] ?? '');
    $phone = sanitizeInput($_POST['phone'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirmPassword'] ?? '';

    // Basic validations
    if (strlen($username) < 3) $errors[] = "Username must be at least 3 characters long";
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Invalid email format";
    if (!validatePhone($phone)) $errors[] = "Invalid Philippine phone number format";

    $passwordErrors = validatePassword($password);
    if (!empty($passwordErrors)) $errors = array_merge($errors, $passwordErrors);
    if ($password !== $confirmPassword) $errors[] = "Passwords do not match";

    // Check duplicates
    if (empty($errors)) {
        $stmt = $pdo->prepare("SELECT username, email FROM users WHERE username = ? OR email = ?");
        $stmt->execute([$username, $email]);
        $existing = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($existing) {
            if ($existing['username'] == $username) $errors[] = "Username already exists";
            if ($existing['email'] == $email) $errors[] = "Email already registered";
        }
    }

    // Insert if valid
    if (empty($errors)) {
        try {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            // Normalize phone
            $formattedPhone = preg_replace('/[^0-9]/', '', $phone);
            if (str_starts_with($formattedPhone, '0')) {
                $formattedPhone = '+63' . substr($formattedPhone, 1);
            } elseif (str_starts_with($formattedPhone, '63')) {
                $formattedPhone = '+' . $formattedPhone;
            } else {
                $formattedPhone = '+63' . $formattedPhone;
            }

            $stmt = $pdo->prepare("INSERT INTO users (username, password, email, phone) VALUES (?, ?, ?, ?)");
            $stmt->execute([$username, $hashedPassword, $email, $formattedPhone]);

            // Success - redirect to login with success message
            header("Location: user_login.html?success=" . urlencode("Registration successful! Please login."));
            exit();
        } catch (PDOException $e) {
            error_log("Registration failed: " . $e->getMessage());
            $errors[] = "Registration failed. Please try again.";
        }
    }

    // If errors, redirect back with error message
    if (!empty($errors)) {
        $errorMessage = implode(", ", $errors);
        header("Location: register.html?error=" . urlencode($errorMessage));
        exit();
    }
} else {
    // If not POST request, redirect to registration form
    header("Location: register.html");
    exit();
}
?>