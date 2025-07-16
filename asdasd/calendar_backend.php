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
    if (!isset($data['barber_id']) || !isset($data['date']) || !isset($data['time']) || !isset($data['service'])) {
        $missing = [];
        if (!isset($data['barber_id'])) $missing[] = 'barber_id';
        if (!isset($data['date'])) $missing[] = 'date';
        if (!isset($data['time'])) $missing[] = 'time';
        if (!isset($data['service'])) $missing[] = 'service';
        
        throw new Exception("Missing required fields: " . implode(', ', $missing) . ". Received data: " . json_encode($data));
    }
    
    $barber_id = trim($data['barber_id']);
    $date = trim($data['date']);
    $time = trim($data['time']);
    $service = trim($data['service']);
    
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
    
    // Check if the time slot is already booked
    $checkStmt = $conn->prepare("SELECT id FROM appointments WHERE barber_id = ? AND date = ? AND time = ?");
    if (!$checkStmt) {
        throw new Exception("Prepare check failed: " . $conn->error);
    }
    
    $checkStmt->bind_param("sss", $barber_id, $date, $time);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    
    if ($checkResult->num_rows > 0) {
        $checkStmt->close();
        throw new Exception("This time slot is already booked. Please choose a different time.");
    }
    
    $checkStmt->close();
    
    // Insert the appointment
    $stmt = $conn->prepare("INSERT INTO appointments (barber_id, service, date, time) VALUES (?, ?, ?, ?)");
    if (!$stmt) {
        throw new Exception("Prepare insert failed: " . $conn->error);
    }
    
    $stmt->bind_param("ssss", $barber_id, $service, $date, $time);
    
    if ($stmt->execute()) {
        $appointmentId = $conn->insert_id;
        
        // Get barber name from database using barber_id
        $barberStmt = $conn->prepare("SELECT name FROM barbers WHERE id = ?");
        if (!$barberStmt) {
            throw new Exception("Failed to prepare barber query: " . $conn->error);
        }
        
        $barberStmt->bind_param("i", $barber_id);
        $barberStmt->execute();
        $barberResult = $barberStmt->get_result();
        $barberName = $barberResult->fetch_assoc()['name'];
        $barberStmt->close();
        
        // Format the response data
        $formattedDate = date('F j, Y', strtotime($date));
        $formattedTime = date('g:i A', strtotime($time));
        
        echo json_encode([
            "success" => true,
            "message" => "Appointment booked successfully!",
            "appointmentId" => $appointmentId,
            "details" => [
                "barber_id" => $barber_id,
                "barber_name" => $barberName,
                "service" => $service,
                "date" => $formattedDate,
                "time" => $formattedTime,
                "rawDate" => $date,
                "rawTime" => $time
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
            "parsed_data" => $data ?? 'Failed to parse JSON'
        ]
    ]);
} finally {
    if (isset($conn)) {
        $conn->close();
    }
}
?>