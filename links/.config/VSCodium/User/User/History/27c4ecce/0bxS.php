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

  if ($jwt) {
    $payload = JWT::validateJWT($jwt);
    if ($payload) {
        echo "Welcome " . $payload['username'];
    } else {
      http_response_code(401);
      echo "Unauthorized access.";
    }
  } else {
    http_response_code(401);
    echo "Token not provided.";
  }
?>
</body>
</html>
