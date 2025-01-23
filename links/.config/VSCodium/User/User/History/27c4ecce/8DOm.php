<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Restricted</title>
  <link rel="stylesheet" href="/output.css">
</head>
<body>
<?php
  include '../lib/jwt.php';
  include '../lib/cookies.php';

  $jwt = Cookies::getCookie('token');
  $payload = null;

  if ($jwt) {
    $payload = JWT::validateJWT($jwt);
    if (!$payload) {
      header("Location: /school/auth/log-in.php", true, 303);
    }
  } else {
    header("Location: /school/auth/log-in.php", true, 303);
  }
?>

<h1>Welcome <?php echo $payload['username']; ?></h1>
</body>
</html>
