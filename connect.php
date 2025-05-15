<?php
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
?>
