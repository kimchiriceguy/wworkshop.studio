<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || !$_SESSION['admin_logged_in']) {
    header("Location: admin_login.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Admin Dashboard</title>
</head>
<body>
<h1>Welcome, <?php echo htmlspecialchars($_SESSION['admin_username']); ?>!</h1>

<p>This is your admin dashboard.</p>

<p><a href="admin_logout.php">Logout</a></p>
</body>
</html>
