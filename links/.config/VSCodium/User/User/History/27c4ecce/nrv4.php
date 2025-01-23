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

  // Get the JWT from the request (for example, from the Authorization header)
  $jwt = $_COOKIE['token'] ?? '';

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
