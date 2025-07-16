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
    
    // Define all possible time slots (you can modify these as needed)
    $allSlots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
        "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
    ];
    
    // Get booked slots for this barber and date
    $stmt = $conn->prepare("SELECT time FROM appointments WHERE barber_id = ? AND date = ?");
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }
    
    $stmt->bind_param("ss", $barberId, $date);
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
            "availableCount" => count($availableSlots)
        ]
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "availableSlots" => [],
        "error" => $e->getMessage()
    ]);
} finally {
    if (isset($conn)) {
        $conn->close();
    }
}
?>