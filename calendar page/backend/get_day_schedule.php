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

    // while loop to create time increments of 35 minutes (this has to be able to be edited by an admin at some point)
    $allSlots = [];
    $startTime = strtotime("11:00 AM");
    $endTime = strtotime("8:00 PM");

    while ($startTime < $endTime) {
    $allSlots[] = date("H:i", $startTime);
    $startTime = strtotime("+35 minutes", $startTime);
}

    
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
        $timeStr = substr($row['time'], 0, 5); // Get HH:MM from HH:MM:SS
        $bookedSlots[] = $timeStr;
    }
    
    $stmt->close();
    
    // Create full schedule with status
    $schedule = [];
    foreach ($allSlots as $slot) {
        $schedule[] = [
            'time' => $slot,
            'status' => in_array($slot, $bookedSlots) ? 'booked' : 'available',
            'formatted_time' => date('g:i A', strtotime($slot))
        ];
    }
    
    echo json_encode([
        "success" => true,
        "schedule" => $schedule,
        "debug" => [
            "barberId" => $barberId,
            "date" => $date,
            "bookedSlots" => $bookedSlots,
            "totalSlots" => count($allSlots),
            "bookedCount" => count($bookedSlots),
            "availableCount" => count($allSlots) - count($bookedSlots)
        ]
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "schedule" => [],
        "error" => $e->getMessage()
    ]);
} finally {
    if (isset($conn)) {
        $conn->close();
    }
}
?>