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
  $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
  $jwt = str_replace('Bearer ', '', $authHeader);

  if ($jwt) {
    $payload = validateJWT($jwt);
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

<h2>If you can see this page, you are authenticated.</h2>
</body>
</html>
