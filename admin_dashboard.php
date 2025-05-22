<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || !$_SESSION['admin_logged_in']) {
    header("Location: admin_login.html");
    exit();
}

// Database connection
$host = "localhost";
$username = "root";
$password = "";
$dbname = "test2calendar";

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create: Add Appointment
if (isset($_POST['add_appointment'])) {
    $barber = $conn->real_escape_string($_POST['barber']);
    $service = $conn->real_escape_string($_POST['service']);
    $date = $_POST['date'];
    $time = $_POST['time'];
    $conn->query("INSERT INTO appointments (barber, service, date, time) VALUES ('$barber', '$service', '$date', '$time')");
    header("Location: admin_dashboard.php");
    exit();
}

// Create: Add Purchase
if (isset($_POST['add_purchase'])) {
    $item = $conn->real_escape_string($_POST['item']);
    $quantity = intval($_POST['quantity']);
    $price = floatval($_POST['price']);
    $conn->query("INSERT INTO purchases (item, quantity, price) VALUES ('$item', $quantity, $price)");
    header("Location: admin_dashboard.php");
    exit();
}

// Delete: Appointment
if (isset($_GET['delete_appointment'])) {
    $id = intval($_GET['delete_appointment']);
    $conn->query("DELETE FROM appointments WHERE id = $id");
    header("Location: admin_dashboard.php");
    exit();
}

// Delete: Purchase
if (isset($_GET['delete_purchase'])) {
    $id = intval($_GET['delete_purchase']);
    $conn->query("DELETE FROM purchases WHERE id = $id");
    header("Location: admin_dashboard.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Admin Dashboard</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { border-collapse: collapse; width: 100%; margin-bottom: 40px; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        h2 { margin-top: 50px; }
        a.delete { color: red; text-decoration: none; }
        a.edit { color: blue; margin-left: 10px; }
        form { margin-bottom: 20px; }
        input, button { margin: 5px; padding: 5px; }
    </style>
</head>
<body>
    <h1>Welcome, <?php echo htmlspecialchars($_SESSION['admin_username']); ?>!</h1>
    <p><a href="admin_logout.php">Logout</a></p>

    <h2>Add New Appointment</h2>
    <form action="admin_dashboard.php" method="POST">
        <input type="text" name="barber" placeholder="Barber" required>
        <input type="text" name="service" placeholder="Service" required>
        <input type="date" name="date" required>
        <input type="time" name="time" required>
        <button type="submit" name="add_appointment">Add Appointment</button>
    </form>

    <h2>Appointments</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Barber</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $result = $conn->query("SELECT * FROM appointments ORDER BY date, time");
            while ($row = $result->fetch_assoc()):
            ?>
            <tr>
                <td><?php echo $row['id']; ?></td>
                <td><?php echo htmlspecialchars($row['barber']); ?></td>
                <td><?php echo htmlspecialchars($row['service']); ?></td>
                <td><?php echo $row['date']; ?></td>
                <td><?php echo $row['time']; ?></td>
                <td>
                    <a class="delete" href="?delete_appointment=<?php echo $row['id']; ?>" onclick="return confirm('Delete this appointment?');">Delete</a>
                    <a class="edit" href="edit_appointment.php?id=<?php echo $row['id']; ?>">Edit</a>
                </td>
            </tr>
            <?php endwhile; ?>
        </tbody>
    </table>

    <h2>Add New Purchase</h2>
    <form action="admin_dashboard.php" method="POST">
        <input type="text" name="item" placeholder="Item" required>
        <input type="number" name="quantity" placeholder="Quantity" required>
        <input type="number" step="0.01" name="price" placeholder="Price" required>
        <button type="submit" name="add_purchase">Add Purchase</button>
    </form>

    <h2>Purchases</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $result = $conn->query("SELECT * FROM purchases ORDER BY id DESC");
            while ($row = $result->fetch_assoc()):
            ?>
            <tr>
                <td><?php echo $row['id']; ?></td>
                <td><?php echo htmlspecialchars($row['item']); ?></td>
                <td><?php echo $row['quantity']; ?></td>
                <td><?php echo number_format($row['price'], 2); ?></td>
                <td>
                    <a class="delete" href="?delete_purchase=<?php echo $row['id']; ?>" onclick="return confirm('Delete this purchase?');">Delete</a>
                    <a class="edit" href="edit_purchase.php?id=<?php echo $row['id']; ?>">Edit</a>
                </td>
            </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
</body>
</html>

<?php
$conn->close();
?>
