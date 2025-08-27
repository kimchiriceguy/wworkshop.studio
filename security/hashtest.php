<?php
$entered = 'somehashedpassword'; // 🔧 TEMP: Simulate user input
$stored = '$2y$10$syIakAKnSwg/3Mb6Rv.8QODZHIOspxUVC/5Z3L1a12MssBgKwalxK';

if (password_verify($entered, $stored)) {
    echo "Password matches!";
} else {
    echo "❌ Incorrect password.";
}
?>