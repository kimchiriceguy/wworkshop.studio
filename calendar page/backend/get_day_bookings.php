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
    if ($conn->connect_error) throw new Exception("Connection failed: " . $conn->connect_error);

    $data = json_decode(file_get_contents('php://input'), true);
    $date = $data['date'] ?? '';
    if (empty($date)) throw new Exception("Date is required");

    $barberResult = $conn->query("SELECT id, name FROM barbers WHERE status = 'active'");
    $bookings = [];
    while ($barber = $barberResult->fetch_assoc()) {
        $stmt = $conn->prepare("SELECT TIME_FORMAT(time, '%H:%i') as time FROM appointments WHERE barber_id = ? AND date = ?");
        $stmt->bind_param("is", $barber['id'], $date);
        $stmt->execute();
        $bookedResult = $stmt->get_result();
        $booked_slots = [];
        while ($row = $bookedResult->fetch_assoc()) $booked_slots[] = $row['time'];
        $all_slots = [];
        $start_time = strtotime("11:00");
        $end_time = strtotime("20:00");
        while ($start_time < $end_time) {
            $all_slots[] = date("H:i", $start_time);
            $start_time = strtotime("+35 minutes", $start_time);
        }
        $available_slots = array_values(array_diff($all_slots, $booked_slots));
        $bookings[] = [
            'id' => $barber['id'],
            'name' => $barber['name'],
            'booked_slots' => array_values($booked_slots),
            'available_slots' => $available_slots
        ];
    }
    echo json_encode(['success' => true, 'bookings' => $bookings]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
} finally {
    if (isset($conn)) $conn->close();
}