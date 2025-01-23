<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Restricted</title>
  <link rel="stylesheet" href="/output.css">
</head>
<body class="prose">
<?php
include '../lib/jwt.php';
include '../lib/cookies.php';

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
</body>
</html>
