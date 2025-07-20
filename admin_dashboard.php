<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || !$_SESSION['admin_logged_in']) {
    header("Location: admin_login.html");
    exit();
}

$host = "localhost";
$username = "root";
$password = "";
$dbname = "wworkshopdb";

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Appointment status update
if (isset($_GET['confirm_appointment'])) {
    $id = intval($_GET['confirm_appointment']);
    $conn->query("UPDATE appointments SET status = 'confirmed' WHERE id = $id");
    header("Location: admin_dashboard.php");
    exit();
}

if (isset($_GET['cancel_appointment'])) {
    $id = intval($_GET['cancel_appointment']);
    $conn->query("UPDATE appointments SET status = 'cancelled' WHERE id = $id");
    header("Location: admin_dashboard.php");
    exit();
}

// Order status update
if (isset($_GET['approve_order'])) {
    $orderId = intval($_GET['approve_order']);
    $conn->query("UPDATE orders SET status = 'approved' WHERE id = $orderId");
    header("Location: admin_dashboard.php");
    exit();
}

if (isset($_GET['decline_order'])) {
    $orderId = intval($_GET['decline_order']);
    $conn->query("UPDATE orders SET status = 'declined' WHERE id = $orderId");
    header("Location: admin_dashboard.php");
    exit();
}

// Add appointment (optional, leave if needed)
if (isset($_POST['add_appointment'])) {
    $barber = $conn->real_escape_string($_POST['barber']);
    $service = $conn->real_escape_string($_POST['service']);
    $date = $_POST['date'];
    $time = $_POST['time'];
    $conn->query("INSERT INTO appointments (barber_id, service, date, time) VALUES ('$barber', '$service', '$date', '$time')");
    header("Location: admin_dashboard.php");
    exit();
}

// Delete appointment (optional)
if (isset($_GET['delete_appointment'])) {
    $id = intval($_GET['delete_appointment']);
    $conn->query("DELETE FROM appointments WHERE id = $id");
    header("Location: admin_dashboard.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - wworkshop.studio</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root {
            --primary-color: #000000;
            --secondary-color: #1a1a1a;
            --accent-color: #333333;
            --text-color: #ffffff;
            --light-gray: #2a2a2a;
            --border-color: #333333;
            --success-color: #4a4a4a;
            --danger-color: #8B0000;
            --border-radius: 0px;
            --box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: system-ui, -apple-system, sans-serif;
        }

        body {
            background-color: var(--secondary-color);
            color: var(--text-color);
            padding: 0;
            margin: 0;
        }

        .header {
            background-color: var(--primary-color);
            padding: 20px 0;
            box-shadow: var(--box-shadow);
        }

        .header .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo-container img {
            max-height: 50px;
        }

        h1 {
            font-size: 24px;
            margin: 0;
        }

        p {
            margin: 5px 0;
        }

        .btn {
            background-color: var(--accent-color);
            color: var(--text-color);
            padding: 10px 15px;
            text-decoration: none;
            border-radius: var(--border-radius);
            transition: background-color 0.3s;
        }

        .btn:hover {
            background-color: var(--success-color);
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .tabs {
            display: flex;
            justify-content: flex-start;
            margin-bottom: 20px;
        }

        .tab-button {
            background-color: var(--primary-color);
            color: var(--text-color);
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            transition: background-color 0.3s;
            margin-right: 5px;
        }

        .tab-button.active {
            background-color: var(--accent-color);
        }

        .tab-content {
            display: none;
            background-color: var(--light-gray);
            padding: 20px;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
        }

        .tab-content.active {
            display: block;
        }

        .crud-section {
            margin-bottom: 40px;
        }

        .crud-section h2 {
            font-size: 20px;
            margin-bottom: 15px;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
        }

        .form-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            background-color: var(--secondary-color);
            color: var(--text-color);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid var(--border-color);
        }

        th {
            background-color: var(--accent-color);
        }

        .action-buttons {
            display: flex;
            gap: 10px;
        }

        .action-buttons a {
            padding: 5px 10px;
            border-radius: var(--border-radius);
            text-decoration: none;
            color: var(--text-color);
            background-color: var(--primary-color);
            transition: background-color 0.3s;
        }

        .action-buttons a:hover {
            background-color: var(--success-color);
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="container">
            <div class="logo-container">
                <img src="./assets/logos/logo2 white.png" alt="Workshop Studio Logo">
            </div>
            <h1>admin dashboard</h1>
            <p>Welcome, <?php echo htmlspecialchars($_SESSION['admin_username']); ?></p>
            <p><a href="admin_logout.php" class="btn">logout</a></p>
        </div>
    </div>

    <div class="container">
        <div class="tabs">
            <button class="tab-button active" onclick="switchTab('appointments')">appointments</button>
            <button class="tab-button" onclick="switchTab('purchases')">orders</button>
        </div>

        <!-- Appointments Tab -->
        <div id="appointments" class="tab-content active">
            <!-- <div class="crud-section">
                <h2>add new appointment</h2>
                <form action="admin_dashboard.php" method="POST">
                    <div class="form-group">
                        <label for="barber">barber</label>
                        <input type="text" id="barber" name="barber" required>
                    </div>
                    <div class="form-group">
                        <label for="service">service</label>
                        <input type="text" id="service" name="service" required>
                    </div>
                    <div class="form-group">
                        <label for="date">date</label>
                        <input type="date" id="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label for="time">time</label>
                        <input type="time" id="time" name="time" required>
                    </div>
                    <button type="submit" name="add_appointment" class="btn">add appointment</button>
                </form>
            </div> -->

            <div class="crud-section">
                <h2>appointments list</h2>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>user_id</th>
                            <th>barber</th>
                            <th>service</th>
                            <th>date</th>
                            <th>time</th>
                            <th>status</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                            $result = $conn->query("SELECT * FROM appointments ORDER BY date, time");
                            while ($row = $result->fetch_assoc()):
                            ?>
                            <tr>
                                <td><?php echo $row['id']; ?></td>
                                <td><?php echo $row['user_id']; ?></td>
                                <td><?php echo htmlspecialchars($row['barber_id']); ?></td>
                                <td><?php echo htmlspecialchars($row['service']); ?></td>
                                <td><?php echo $row['date']; ?></td>
                                <td><?php echo $row['time']; ?></td>
                                <td><?php echo ucfirst($row['status']); ?></td>
                                <td class="action-buttons">
                                    <?php if ($row['status'] === 'pending'): ?>
                                        <a href="?confirm_appointment=<?php echo $row['id']; ?>" class="btn">Confirm</a>
                                        <a href="?cancel_appointment=<?php echo $row['id']; ?>" class="btn" onclick="return confirm('Cancel this appointment?');">Cancel</a>
                                    <?php else: ?>
                                        <em><?php echo ucfirst($row['status']); ?></em>
                                    <?php endif; ?>
                                    <!-- <a href="?delete_appointment=<?php echo $row['id']; ?>" class="btn" onclick="return confirm('Delete this appointment?');">Delete</a> -->
                                </td>
                            </tr>
                        <?php endwhile; ?>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- Orders Tab -->
        <div id="purchases" class="tab-content">
            <div class="crud-section">
                <h2>customer orders</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User ID</th>
                            <th>Order Date</th>
                            <th>Proof</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $orders = $conn->query("SELECT * FROM orders ORDER BY order_date DESC");
                        while ($order = $orders->fetch_assoc()):
                        ?>
                        <tr>
                            <td><?php echo $order['id']; ?></td>
                            <td><?php echo $order['user_id']; ?></td>
                            <td><?php echo $order['order_date']; ?></td>
                            <td>
                                <?php if ($order['proof_image']): ?>
                                    <a href="uploads/<?php echo htmlspecialchars($order['proof_image']); ?>" target="_blank">
                                        <img src="uploads/<?php echo htmlspecialchars($order['proof_image']); ?>" alt="Proof" style="max-height: 60px;">
                                    </a>
                                <?php else: ?>
                                    <em>No Image</em>
                                <?php endif; ?>
                            </td>
                            <td><?php echo $order['status']; ?></td>
                            <td class="action-buttons">
                                <?php if ($order['status'] === 'pending'): ?>
                                    <div style="display: flex; flex-direction: column; gap: 5px;">
                                        <a href="?approve_order=<?php echo $order['id']; ?>" class="btn">Approve</a>
                                        <a href="?decline_order=<?php echo $order['id']; ?>" class="btn" onclick="return confirm('Decline this order?');">Decline</a>
                                        <button onclick="toggleItems('items-<?php echo $order['id']; ?>')" class="btn">View Items</button>
                                    </div>
                                <?php else: ?>
                                    <div style="display: flex; flex-direction: column; gap: 5px;">
                                        <em><?php echo ucfirst($order['status']); ?></em>
                                        <button onclick="toggleItems('items-<?php echo $order['id']; ?>')" class="btn">View Items</button>
                                    </div>
                                <?php endif; ?>
                            </td>
                        </tr>
                        <tr id="items-<?php echo $order['id']; ?>" style="display: none; background-color: #2a2a2a;">
                            <td colspan="6">
                                <table style="width: 100%; margin-top: 10px;">
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php
                                        $order_id = $order['id'];
                                        $items_result = $conn->query("SELECT item, quantity, price FROM purchases WHERE order_id = $order_id");
                                        while ($item = $items_result->fetch_assoc()):
                                        ?>
                                        <tr>
                                            <td><?php echo htmlspecialchars($item['item']); ?></td>
                                            <td><?php echo $item['quantity']; ?></td>
                                            <td>₱<?php echo number_format($item['price'], 2); ?></td>
                                        </tr>
                                        <?php endwhile; ?>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <?php endwhile; ?>
                    </tbody>
                </table>
            </div>
        </div>

    </div>

    <script>
        function switchTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            document.querySelectorAll('.tab-button').forEach(button => {
                button.classList.remove('active');
            });
            
            document.getElementById(tabId).classList.add('active');
            document.querySelector(`button[onclick="switchTab('${tabId}')"]`).classList.add('active');
        }

        function toggleItems(id) {
            const row = document.getElementById(id);
            if (row.style.display === 'none') {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }
        }
    </script>
</body>
</html>

<?php $conn->close(); ?>
