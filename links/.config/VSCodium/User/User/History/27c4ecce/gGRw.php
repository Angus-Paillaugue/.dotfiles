<?php
session_start();
require_once '../lib/connector.php';
require_once '../lib/components.php';
require_once '../lib/jwt.php';
require_once '../lib/cookies.php';
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$title = 'Page restreinte';
$jwt = Cookies::getCookie('token');
$payload = null;

if ($jwt) {
	$payload = JWT::validateJWT($jwt);
	if (!$payload) {
		header('Location: log-in.php', true, 303);
	}
} else {
	header('Location: log-in.php', true, 303);
}
?>

<h2>Welcome <?php echo $payload['username']; ?></h2>
