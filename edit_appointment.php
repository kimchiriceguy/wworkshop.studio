<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || !$_SESSION['admin_logged_in']) {
    header("Location: admin_login.html");
    exit();
}

$host = "localhost";
$username = "root";
$password = "";
$dbname = "test2calendar";

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = intval($_GET['id']);

if (isset($_POST['update_appointment'])) {
    $barber = $conn->real_escape_string($_POST['barber']);
    $service = $conn->real_escape_string($_POST['service']);
    $date = $_POST['date'];
    $time = $_POST['time'];

    $conn->query("UPDATE appointments SET barber='$barber', service='$service', date='$date', time='$time' WHERE id=$id");
    header("Location: admin_dashboard.php");
    exit();
}

$result = $conn->query("SELECT * FROM appointments WHERE id = $id");
$row = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Edit Appointment</title>
</head>
<body>
    <h2>Edit Appointment</h2>
    <form method="POST">
        <label>Barber: <input type="text" name="barber" value="<?php echo htmlspecialchars($row['barber']); ?>" required></label><br>
        <label>Service: <input type="text" name="service" value="<?php echo htmlspecialchars($row['service']); ?>" required></label><br>
        <label>Date: <input type="date" name="date" value="<?php echo $row['date']; ?>" required></label><br>
        <label>Time: <input type="time" name="time" value="<?php echo $row['time']; ?>" required></label><br>
        <button type="submit" name="update_appointment">Update</button>
        <a href="admin_dashboard.php">Cancel</a>
    </form>
</body>
</html>

<?php $conn->close(); ?>
