<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host = "localhost";
$username = "root";
$password = "";
$database = "wworkshopdb";

try {
    $conn = new mysqli($host, $username, $password, $database);
    
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    
    // Get JSON input
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        throw new Exception("No valid JSON data received. Input: " . $input);
    }
    
    // Validate required fields
    $required_fields = ['barber_id', 'date', 'time', 'service'];
    $missing = [];
    
    foreach ($required_fields as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            $missing[] = $field;
        }
    }
    
    if (!empty($missing)) {
        throw new Exception("Missing required fields: " . implode(', ', $missing) . ". Received data: " . json_encode($data));
    }
    
    $barber_id = trim($data['barber_id']);
    $date = trim($data['date']);
    $time = trim($data['time']);
    $service = trim($data['service']);
    
    // Create a guest user if user_id is not provided
    if (!isset($data['user_id']) || empty($data['user_id'])) {
        // Generate a unique email for guest
        $guestEmail = 'guest_' . time() . '@temporary.com';
        
        // Insert guest user
        $userStmt = $conn->prepare("INSERT INTO users (name, email) VALUES ('Guest User', ?)");
        if (!$userStmt) {
            throw new Exception("Failed to prepare user insert statement: " . $conn->error);
        }
        
        $userStmt->bind_param("s", $guestEmail);
        if (!$userStmt->execute()) {
            throw new Exception("Failed to create guest user: " . $userStmt->error);
        }
        
        $user_id = $conn->insert_id;
        $userStmt->close();
    } else {
        $user_id = $data['user_id'];
    }

    // Check if user exists
    $userCheckStmt = $conn->prepare("SELECT id FROM users WHERE id = ?");
    if (!$userCheckStmt) {
        throw new Exception("Failed to prepare user check statement: " . $conn->error);
    }

    $userCheckStmt->bind_param("i", $user_id);
    $userCheckStmt->execute();
    $userResult = $userCheckStmt->get_result();

    if ($userResult->num_rows === 0) {
        $userCheckStmt->close();
        throw new Exception("Invalid user ID");
    }
    $userCheckStmt->close();
    
    // Validate date format
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
        throw new Exception("Invalid date format. Expected YYYY-MM-DD, got: " . $date);
    }
    
    // Validate time format
    if (!preg_match('/^\d{2}:\d{2}$/', $time)) {
        throw new Exception("Invalid time format. Expected HH:MM, got: " . $time);
    }
    
    // Validate that the date is not in the past
    $selectedDate = new DateTime($date);
    $today = new DateTime();
    $today->setTime(0, 0, 0); // Reset time to start of day
    
    if ($selectedDate < $today) {
        throw new Exception("Cannot book appointments for past dates.");
    }
    
    // Validate that the barber exists
    $barberCheckStmt = $conn->prepare("SELECT id, name FROM barbers WHERE id = ? AND status = 'active'");
    if (!$barberCheckStmt) {
        throw new Exception("Prepare barber check failed: " . $conn->error);
    }
    
    $barberCheckStmt->bind_param("i", $barber_id);
    $barberCheckStmt->execute();
    $barberResult = $barberCheckStmt->get_result();
    
    if ($barberResult->num_rows === 0) {
        $barberCheckStmt->close();
        throw new Exception("Invalid barber selected or barber is not active.");
    }
    
    $barberData = $barberResult->fetch_assoc();
    $barberCheckStmt->close();
    
    // Check if the time slot is already booked
    $checkStmt = $conn->prepare("SELECT id FROM appointments WHERE barber_id = ? AND date = ? AND time = ?");
    if (!$checkStmt) {
        throw new Exception("Prepare check failed: " . $conn->error);
    }
    
    $checkStmt->bind_param("iss", $barber_id, $date, $time);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    
    if ($checkResult->num_rows > 0) {
        $checkStmt->close();
        throw new Exception("This time slot is already booked. Please choose a different time.");
    }
    
    $checkStmt->close();
    
    // Insert the appointment
    $stmt = $conn->prepare("INSERT INTO appointments (user_id, barber_id, service, date, time, status) VALUES (?, ?, ?, ?, ?, 'confirmed')");
    if (!$stmt) {
        throw new Exception("Prepare insert failed: " . $conn->error);
    }
    
    $stmt->bind_param("iisss", $user_id, $barber_id, $service, $date, $time);
    
    if ($stmt->execute()) {
        $appointmentId = $conn->insert_id;
        
        // Format the response data
        $formattedDate = date('F j, Y', strtotime($date));
        $formattedTime = date('g:i A', strtotime($time));
        
        echo json_encode([
            "success" => true,
            "message" => "Appointment booked successfully!",
            "appointmentId" => $appointmentId,
            "details" => [
                "user_id" => $user_id,
                "barber_id" => $barber_id,
                "barber_name" => $barberData['name'],
                "service" => $service,
                "date" => $formattedDate,
                "time" => $formattedTime,
                "rawDate" => $date,
                "rawTime" => $time,
                "status" => "confirmed"
            ]
        ]);
    } else {
        throw new Exception("Failed to book appointment: " . $stmt->error);
    }
    
    $stmt->close();
    
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage(),
        "debug" => [
            "input" => $input ?? 'No input received',
            "parsed_data" => $data ?? 'Failed to parse JSON',
            "timestamp" => date('Y-m-d H:i:s')
        ]
    ]);
} finally {
    if (isset($conn)) {
        $conn->close();
    }
}
?>