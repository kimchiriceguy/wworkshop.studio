<?php
session_start();

// Database configuration
$host = 'localhost';
$dbname = 'wworkshopdb';
$username = 'root'; // Change as needed
$password = '';     // Change as needed

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Function to validate password strength
function validatePassword($password) {
    $errors = [];
    
    if (strlen($password) < 8) {
        $errors[] = "Password must be at least 8 characters long";
    }
    
    if (!preg_match('/[A-Z]/', $password)) {
        $errors[] = "Password must contain at least one uppercase letter";
    }
    
    if (!preg_match('/[a-z]/', $password)) {
        $errors[] = "Password must contain at least one lowercase letter";
    }
    
    if (!preg_match('/[0-9]/', $password)) {
        $errors[] = "Password must contain at least one number";
    }
    
    return $errors;
}

// Function to validate phone number (Philippine format)
function validatePhone($phone) {
    // Remove all non-digit characters
    $phone = preg_replace('/[^0-9]/', '', $phone);
    
    // Check if it's a valid Philippine number
    if (preg_match('/^(63|0)9[0-9]{9}$/', $phone)) {
        return true;
    }
    
    return false;
}

// Function to sanitize input
function sanitizeInput($data) {
    return htmlspecialchars(trim($data));
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $errors = [];
    
    // Get and sanitize form data
    $username = sanitizeInput($_POST['username']);
    $email = sanitizeInput($_POST['email']);
    $phone = sanitizeInput($_POST['phone']);
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];
    
    // Validate required fields
    if (empty($username)) {
        $errors[] = "Username is required";
    } elseif (strlen($username) < 3) {
        $errors[] = "Username must be at least 3 characters long";
    }
    
    if (empty($email)) {
        $errors[] = "Email is required";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format";
    }
    
    if (empty($phone)) {
        $errors[] = "Phone number is required";
    } elseif (!validatePhone($phone)) {
        $errors[] = "Invalid Philippine phone number format";
    }
    
    if (empty($password)) {
        $errors[] = "Password is required";
    } else {
        $passwordErrors = validatePassword($password);
        $errors = array_merge($errors, $passwordErrors);
    }
    
    if ($password !== $confirmPassword) {
        $errors[] = "Passwords do not match";
    }
    
    // Check if username already exists
    if (empty($errors)) {
        $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
        $stmt->execute([$username]);
        if ($stmt->rowCount() > 0) {
            $errors[] = "Username already exists";
        }
    }
    
    // Check if email already exists
    if (empty($errors)) {
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->rowCount() > 0) {
            $errors[] = "Email already registered";
        }
    }
    
    // If no errors, create the user
    if (empty($errors)) {
        try {
            // Hash the password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            
            // Format phone number (ensure it starts with +63)
            $formattedPhone = preg_replace('/[^0-9]/', '', $phone);
            if (substr($formattedPhone, 0, 2) == '63') {
                $formattedPhone = '+' . $formattedPhone;
            } elseif (substr($formattedPhone, 0, 1) == '0') {
                $formattedPhone = '+63' . substr($formattedPhone, 1);
            } else {
                $formattedPhone = '+63' . $formattedPhone;
            }
            
            // Insert user into database
            $stmt = $pdo->prepare("INSERT INTO users (username, password, email, phone) VALUES (?, ?, ?, ?)");
            $stmt->execute([$username, $hashedPassword, $email, $formattedPhone]);
            
            // Redirect to login page with success message
            header("Location: admin_login.html?success=" . urlencode("Registration successful! Please login."));
            exit();
            
        } catch(PDOException $e) {
            $errors[] = "Registration failed. Please try again.";
            // Log the actual error for debugging
            error_log("Registration error: " . $e->getMessage());
        }
    }
    
    // If there are errors, redirect back with error message
    if (!empty($errors)) {
        $errorMessage = implode(", ", $errors);
        header("Location: register.html?error=" . urlencode($errorMessage));
        exit();
    }
} else {
    // If not POST request, redirect to registration page
    header("Location: register.html");
    exit();
}
?>