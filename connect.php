<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "test2calendar";

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from form
$name = $_POST['name'];
$service = $_POST['service'];
$date = $_POST['date'];
$time = $_POST['time'];

// Insert into database
$sql = "INSERT INTO appointments (name, service, date, time) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $service, $date, $time);

if ($stmt->execute()) {
    // Redirect back to the form with a success flag
    header("Location: calendar.html?success=1");
    exit();
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
