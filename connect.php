<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host = "localhost";
$username = "root";
$password = "";
$database = "wworkshopdb";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

// Accept JSON input
$data = json_decode(file_get_contents('php://input'), true);

if (
    !isset($data['barber']) ||
    !isset($data['date']) ||
    !isset($data['time'])
) {
    die(json_encode(["success" => false, "message" => "Missing required form fields."]));
}

$barber = $data['barber'];
$date = $data['date'];
$time = $data['time'];

$sql = "INSERT INTO appointments (barber, date, time) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    die(json_encode(["success" => false, "message" => "Prepare failed: " . $conn->error]));
}
$stmt->bind_param("sss", $barber, $date, $time);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
