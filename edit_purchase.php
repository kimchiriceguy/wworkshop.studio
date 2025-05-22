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

if (isset($_POST['update_purchase'])) {
    $item = $conn->real_escape_string($_POST['item']);
    $quantity = intval($_POST['quantity']);
    $price = floatval($_POST['price']);

    $conn->query("UPDATE purchases SET item='$item', quantity=$quantity, price=$price WHERE id=$id");
    header("Location: admin_dashboard.php");
    exit();
}

$result = $conn->query("SELECT * FROM purchases WHERE id = $id");
$row = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Edit Purchase</title>
</head>
<body>
    <h2>Edit Purchase</h2>
    <form method="POST">
        <label>Item: <input type="text" name="item" value="<?php echo htmlspecialchars($row['item']); ?>" required></label><br>
        <label>Quantity: <input type="number" name="quantity" value="<?php echo $row['quantity']; ?>" required></label><br>
        <label>Price: <input type="number" step="0.01" name="price" value="<?php echo $row['price']; ?>" required></label><br>
        <button type="submit" name="update_purchase">Update</button>
        <a href="admin_dashboard.php">Cancel</a>
    </form>
</body>
</html>

<?php $conn->close(); ?>
