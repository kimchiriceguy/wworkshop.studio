<?php
session_start();
if (!isset($_SESSION['user_logged_in']) || !$_SESSION['user_logged_in']) {
    header("Location: admin_login.html");
    exit();
}

$host = "localhost";
$username = "root";
$password = "";
$dbname = "wworkshopdb";

$error = "";
$success = "";

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$user_username = $_SESSION['user_username'];
$user_id = null;

$stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
$stmt->bind_param("s", $user_username);
$stmt->execute();
$stmt->bind_result($user_id);
$stmt->fetch();
$stmt->close();

if (!$user_id) {
    die("User not found.");
}

if (isset($_GET['cancel_appointment'])) {
    $appointmentId = intval($_GET['cancel_appointment']);
    $stmt = $conn->prepare("UPDATE appointments SET status = 'cancelled' WHERE id = ? AND user_id = ?");
    $stmt->bind_param("ii", $appointmentId, $_SESSION['user_id']);
    $stmt->execute();
    header("Location: user_dashboard.php?tab=appointments");
    exit();
}

// if (isset($_POST['edit_appointment'])) {
//     $appointmentId = intval($_POST['appointment_id']);
//     $newDate = $_POST['new_date'];
//     $newTime = $_POST['new_time'];
//     $newService = $_POST['new_service'];

//     $stmt = $conn->prepare("UPDATE appointments SET date = ?, time = ?, service = ? WHERE id = ? AND user_id = ? AND status = 'pending'");
//     $stmt->bind_param("sssii", $newDate, $newTime, $newService, $appointmentId, $_SESSION['user_id']);
//     $stmt->execute();
//     header("Location: user_dashboard.php?tab=appointments");
//     exit();
// }

//update profile
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    $user_id = $_SESSION['user_id'];

    if ($action === 'update_username' && !empty($_POST['username'])) {
        $newUsername = trim($_POST['username']);
        $stmt = $conn->prepare("SELECT id FROM users WHERE username = ? AND id != ?");
        $stmt->bind_param("si", $newUsername, $user_id);
        $stmt->execute();
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            $error = "Username already taken.";
        } else {
            $stmt = $conn->prepare("UPDATE users SET username = ? WHERE id = ?");
            $stmt->bind_param("si", $newUsername, $user_id);
            $stmt->execute();
            $_SESSION['user_username'] = $newUsername;
            $success = "Username updated.";
        }
        $stmt->close();

    } elseif ($action === 'update_email' && !empty($_POST['email'])) {
        $newEmail = trim($_POST['email']);
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = ? AND id != ?");
        $stmt->bind_param("si", $newEmail, $user_id);
        $stmt->execute();
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            $error = "Email already taken.";
        } else {
            $stmt = $conn->prepare("UPDATE users SET email = ? WHERE id = ?");
            $stmt->bind_param("si", $newEmail, $user_id);
            $stmt->execute();
            $success = "Email updated.";
        }
        $stmt->close();

    } elseif ($action === 'update_password' && !empty($_POST['password']) && !empty($_POST['confirm_password'])) {
        $password = $_POST['password'];
        $confirm = $_POST['confirm_password'];

        if (strlen($password) < 8 || 
            !preg_match('/[A-Z]/', $password) || 
            !preg_match('/[a-z]/', $password) || 
            !preg_match('/[0-9]/', $password)) {
            $error = "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, and 1 number.";
        } elseif ($password !== $confirm) {
            $error = "Passwords do not match.";
        } else {
            $hashed = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
            $stmt->bind_param("si", $hashed, $user_id);
            $stmt->execute();
            $success = "Password updated.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>User Dashboard - wworkshop.studio</title>
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
            background-color: var(--secondary-color);
            border: 1px solid var(--border-color);
            padding: 20px;
            margin-bottom: 25px;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
        }

        .crud-section h2 {
            font-size: 20px;
            margin-bottom: 15px;
        }
        .crud-section h3 {
            font-size: 18px;
            margin-bottom: 15px;
            color: var(--text-color);
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
        .form-group input::placeholder {
            color: #ccc;
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

        .success {
            background-color: #d4edda;
            color: #155724;
            padding: 10px;
            border-left: 5px solid #28a745;
            margin-bottom: 10px;
        }

        .error {
            background-color: #f8d7da;
            color: #721c24;
            padding: 10px;
            border-left: 5px solid #dc3545;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="container">
            <div class="logo-container">
                <img src="./assets/logos/logo2 white.png" alt="Workshop Studio Logo">
            </div>
            <h1>user dashboard</h1>
            <p>Welcome, <?php echo htmlspecialchars($_SESSION['user_username']); ?></p>
            <div style="display: flex; gap: 10px;">
                <a href="index.php" class="btn">home</a>
                <a href="logout.php" class="btn">logout</a>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="tabs">
            <button class="tab-button active" onclick="switchTab('appointments')">my appointments</button>
            <button class="tab-button" onclick="switchTab('orders')">my orders</button>
            <button class="tab-button" onclick="switchTab('account')">my account</button>
        </div>

        <div id="appointments" class="tab-content active">
            <h2>Appointments</h2>
            <table>
                <thead>
                    <tr>
                        <th>Barber</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $res = $conn->query("SELECT a.*, b.name AS barber_name FROM appointments a JOIN barbers b ON a.barber_id = b.id WHERE a.user_id = $user_id ORDER BY a.date, a.time");
                    while ($row = $res->fetch_assoc()): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($row['barber_name']); ?></td>
                            <td><?php echo htmlspecialchars($row['service']); ?></td>
                            <td><?php echo $row['date']; ?></td>
                            <td><?php echo $row['time']; ?></td>
                            <td><?php echo ucfirst($row['status']); ?></td>
                            <td>
                                <?php if ($row['status'] === 'pending'): ?>
                                    <a href="user_dashboard.php?cancel_appointment=<?php echo $row['id']; ?>&tab=appointments" class="btn" onclick="return confirm('Cancel this appointment?');">Cancel</a>
                                <?php else: ?>
                                    <em>N/A</em>
                                <?php endif; ?>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>

        <div id="orders" class="tab-content">
            <h2>My Orders</h2>
            <table>
                <thead>
                    <tr>
                        <th>Order Date</th>
                        <th>Proof</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $orders = $conn->query("SELECT * FROM orders WHERE user_id = $user_id ORDER BY order_date DESC");
                    while ($order = $orders->fetch_assoc()): ?>
                        <tr>
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
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>

            <div id="account" class="tab-content">
                <h2>Edit Account Info</h2>

                <?php if (!empty($error)): ?>
                    <div class="error"><?php echo $error; ?></div>
                <?php elseif (!empty($success)): ?>
                    <div class="success"><?php echo $success; ?></div>
                <?php endif; ?>

                <!-- Update Username -->
                <div class="crud-section">
                    <h3>Change Username</h3>
                    <form action="user_dashboard.php?tab=account" method="POST">
                        <input type="hidden" name="action" value="update_username">
                        <div class="form-group">
                            <label for="username">New Username</label>
                            <input type="text" name="username" id="username" placeholder="Enter new username" required>
                        </div>
                        <button type="submit" class="btn">Update Username</button>
                    </form>
                </div>

                <!-- Update Email -->
                <div class="crud-section">
                    <h3>Change Email</h3>
                    <form action="user_dashboard.php?tab=account" method="POST">
                        <input type="hidden" name="action" value="update_email">
                        <div class="form-group">
                            <label for="email">New Email</label>
                            <input type="email" name="email" id="email" placeholder="Enter new email" required>
                        </div>
                        <button type="submit" class="btn">Update Email</button>
                    </form>
                </div>

                <!-- Update Password -->
                <div class="crud-section">
                    <h3>Change Password</h3>
                    <form id="passwordForm" action="user_dashboard.php?tab=account" method="POST">
                        <input type="hidden" name="action" value="update_password">
                        <div class="form-group">
                            <label for="password">New Password</label>
                            <input type="password" name="password" id="password" placeholder="Enter new password" required>
                        </div>
                        <div class="form-group">
                            <label for="confirm_password">Confirm Password</label>
                            <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm password" required>
                        </div>
                        <button type="submit" class="btn">Update Password</button>
                    </form>
                </div>
            </div>
    </div>

        <script>
            function switchTab(tabId) {
                document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
                document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
                document.getElementById(tabId).classList.add('active');
                document.querySelector(`button[onclick="switchTab('${tabId}')"]`).classList.add('active');
            }

            // Get tab from URL if present
            const urlParams = new URLSearchParams(window.location.search);
            const tab = urlParams.get('tab');
            if (tab) {
                switchTab(tab);
            }

            // Password validation
            document.getElementById("passwordForm")?.addEventListener("submit", function(e) {
                const password = document.getElementById("password").value;
                const confirm = document.getElementById("confirm_password").value;
                const errorMsg = [];

                if (password.length < 8) {
                    errorMsg.push("At least 8 characters.");
                }
                if (!/[A-Z]/.test(password)) {
                    errorMsg.push("One uppercase letter.");
                }
                if (!/[a-z]/.test(password)) {
                    errorMsg.push("One lowercase letter.");
                }
                if (!/[0-9]/.test(password)) {
                    errorMsg.push("One number.");
                }
                if (password !== confirm) {
                    errorMsg.push("Passwords do not match.");
                }

                if (errorMsg.length > 0) {
                    alert("Password Error:\n" + errorMsg.join("\n"));
                    e.preventDefault();
                }
            });
        </script>
</body>
</html>

<?php $conn->close(); ?>
