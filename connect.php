<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "test2calendar";

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from form
$name = $_POST['name'];
$service = $_POST['service'];
$date = $_POST['date'];
$time = $_POST['time'];

// Insert into database
$sql = "INSERT INTO appointments (name, service, date, time) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $service, $date, $time);

if ($stmt->execute()) {
    // Redirect back to the form with a success flag
    header("Location: calendar.html?success=1");
    exit();
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>

??
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Database configuration
$host = 'localhost';
$dbname = 'wworkshop_db';
$username = 'your_username';
$password = 'your_password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);

    // Insert booking into database
    $stmt = $pdo->prepare("
        INSERT INTO bookings (barber_name, booking_date, booking_time, customer_name, status)
        VALUES (:barber, :date, :time, :customer, 'pending')
    ");

    $stmt->execute([
        ':barber' => $data['barber'],
        ':date' => $data['date'],
        ':time' => $data['time'],
        ':customer' => $data['customer']
    ]);

    echo json_encode(['success' => true, 'message' => 'Booking confirmed']);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

