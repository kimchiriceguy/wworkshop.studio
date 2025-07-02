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
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Appointment - wworkshop.studio</title>
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
            background-color: var(--primary-color);
            color: var(--text-color);
            line-height: 1.6;
        }

        .container {
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
        }

        .header {
            background-color: var(--primary-color);
            border-bottom: 1px solid var(--border-color);
            padding: 2rem;
            margin-bottom: 2rem;
        }

        .header h2 {
            font-size: 2rem;
            font-weight: 400;
            text-transform: lowercase;
            letter-spacing: 1px;
        }

        .logo-container img {
            max-height: 50px;
        }
        
        .crud-section {
            background-color: var(--secondary-color);
            padding: 2rem;
            margin-bottom: 2rem;
            border: 1px solid var(--border-color);
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 400;
            color: var(--text-color);
            text-transform: lowercase;
            letter-spacing: 1px;
        }

        .form-group input {
            width: 100%;
            padding: 12px;
            background-color: var(--primary-color);
            border: 1px solid var(--border-color);
            color: var(--text-color);
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }

        .form-group input:focus {
            outline: none;
            border-color: var(--text-color);
        }

        .btn {
            padding: 12px 24px;
            border: 1px solid var(--border-color);
            background-color: transparent;
            color: var(--text-color);
            cursor: pointer;
            font-weight: 400;
            text-transform: lowercase;
            letter-spacing: 1px;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }

        .btn:hover {
            background-color: var(--text-color);
            color: var(--primary-color);
        }

        .button-group {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }

        .btn-primary {
            background-color: var(--accent-color);
        }
        

        .btn-secondary {
            background-color: var(--secondary-color);
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
        <div class="crud-section">
            <form method="POST">
                <div class="form-group">
                    <label for="barber">barber</label>
                    <input type="text" id="barber" name="barber" value="<?php echo htmlspecialchars($row['barber']); ?>" required>
                </div>
                <div class="form-group">
                    <label for="service">service</label>
                    <input type="text" id="service" name="service" value="<?php echo htmlspecialchars($row['service']); ?>" required>
                </div>
                <div class="form-group">
                    <label for="date">date</label>
                    <input type="date" id="date" name="date" value="<?php echo $row['date']; ?>" required>
                </div>
                <div class="form-group">
                    <label for="time">time</label>
                    <input type="time" id="time" name="time" value="<?php echo $row['time']; ?>" required>
                </div>
                <div class="button-group">
                    <button type="submit" name="update_appointment" class="btn btn-primary">update appointment</button>
                    <a href="admin_dashboard.php" class="btn btn-secondary">cancel</a>
                </div>
            </form>
        </div>
    </div>
</body>
</html>

<?php $conn->close(); ?>
