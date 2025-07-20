<?php
session_start();
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

    // ✅ Get user_id from session
    if (!isset($_SESSION['user_id'])) {
        die(json_encode(["success" => false, "message" => "User not logged in."]));
    }

    $user_id = $_SESSION['user_id'];

    // ✅ Optional: Check if user still exists
    $userCheckStmt = $conn->prepare("SELECT id FROM users WHERE id = ?");
    $userCheckStmt->bind_param("i", $user_id);
    $userCheckStmt->execute();
    $userResult = $userCheckStmt->get_result();

    if ($userResult->num_rows === 0) {
        $userCheckStmt->close();
        throw new Exception("User not found in database.");
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

    // Ensure the date is not in the past
    $selectedDate = new DateTime($date);
    $today = new DateTime();
    $today->setTime(0, 0, 0);

    if ($selectedDate < $today) {
        throw new Exception("Cannot book appointments for past dates.");
    }

    // Check if barber is active
    $barberCheckStmt = $conn->prepare("SELECT id, name FROM barbers WHERE id = ? AND status = 'active'");
    $barberCheckStmt->bind_param("i", $barber_id);
    $barberCheckStmt->execute();
    $barberResult = $barberCheckStmt->get_result();

    if ($barberResult->num_rows === 0) {
        $barberCheckStmt->close();
        throw new Exception("Invalid barber selected or barber is not active.");
    }

    $barberData = $barberResult->fetch_assoc();
    $barberCheckStmt->close();

    // Check if time slot is already booked
    $checkStmt = $conn->prepare("SELECT id FROM appointments WHERE barber_id = ? AND date = ? AND time = ?");
    $checkStmt->bind_param("iss", $barber_id, $date, $time);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();

    if ($checkResult->num_rows > 0) {
        $checkStmt->close();
        throw new Exception("This time slot is already booked. Please choose a different time.");
    }

    $checkStmt->close();

    // Insert appointment
    $stmt = $conn->prepare("INSERT INTO appointments (user_id, barber_id, service, date, time) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("iisss", $user_id, $barber_id, $service, $date, $time);

    if ($stmt->execute()) {
        $appointmentId = $conn->insert_id;

        // Format response
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
