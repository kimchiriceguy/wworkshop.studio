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
    $year = $data['year'] ?? '';
    $month = $data['month'] ?? '';
    
    if (empty($barberId) || empty($year) || empty($month)) {
        throw new Exception("Missing required parameters");
    }
    
    // Create start and end dates for the month
    $startDate = sprintf("%04d-%02d-01", $year, $month);
    $endDate = sprintf("%04d-%02d-%02d", $year, $month, cal_days_in_month(CAL_GREGORIAN, $month, $year));
    
    // Get all appointments for this barber in the specified month
    $stmt = $conn->prepare("
        SELECT date, time, id 
        FROM appointments 
        WHERE barber_id = ? AND date >= ? AND date <= ?
        ORDER BY date, time
    ");
    
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }
    
    $stmt->bind_param("sss", $barberId, $startDate, $endDate);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $appointments = [];
    while ($row = $result->fetch_assoc()) {
        $appointments[] = [
            'id' => $row['id'],
            'date' => $row['date'],
            'time' => substr($row['time'], 0, 5), // Format as HH:MM
            'formatted_time' => date('g:i A', strtotime($row['time']))
        ];
    }
    
    $stmt->close();
    
    echo json_encode([
        "success" => true,
        "appointments" => $appointments,
        "debug" => [
            "barberId" => $barberId,
            "year" => $year,
            "month" => $month,
            "startDate" => $startDate,
            "endDate" => $endDate,
            "appointmentCount" => count($appointments)
        ]
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "appointments" => [],
        "error" => $e->getMessage()
    ]);
} finally {
    if (isset($conn)) {
        $conn->close();
    }
}
?>