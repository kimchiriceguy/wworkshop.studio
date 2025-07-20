<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$host = "localhost";
$username = "root";
$password = "";
$database = "wworkshopdb";

try {
    $conn = new mysqli($host, $username, $password, $database);
    
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        throw new Exception("No data received");
    }
    
    $barberId = $data['barber_id'] ?? '';
    $date = $data['date'] ?? '';
    
    if (empty($barberId) || empty($date)) {
        throw new Exception("Missing barber_id or date");
    }
    
    // Generate time slots (matching calendar_script.js)
    $allSlots = [];
    $startTime = strtotime("11:00");
    $endTime = strtotime("20:00");
    
    while ($startTime < $endTime) {
        $allSlots[] = date("H:i", $startTime);
        $startTime = strtotime("+35 minutes", $startTime);
    }
    
    // Get booked slots for this barber and date
    $stmt = $conn->prepare("SELECT time FROM appointments WHERE barber_id = ? AND date = ?");
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }
    
    $stmt->bind_param("is", $barberId, $date);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $bookedSlots = [];
    while ($row = $result->fetch_assoc()) {
        // Convert time to HH:MM format
        $timeStr = substr($row['time'], 0, 5); // Get HH:MM from HH:MM:SS
        $bookedSlots[] = $timeStr;
    }
    
    $stmt->close();
    
    // Filter out booked slots
    $availableSlots = array_values(array_diff($allSlots, $bookedSlots));
    
    echo json_encode([
        "success" => true,
        "availableSlots" => $availableSlots,
        "bookedSlots" => $bookedSlots,
        "debug" => [
            "barberId" => $barberId,
            "date" => $date,
            "totalSlots" => count($allSlots),
            "bookedCount" => count($bookedSlots),
            "availableCount" => count($availableSlots),