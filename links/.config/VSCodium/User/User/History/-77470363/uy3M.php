<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo $title ?></title>
  <link rel="stylesheet" href="/output.css">
</head>
<body>
  <nav>
    <ul class="flex space-x-4">
      <li><a href="/school/auth/sign-up.php">Sign up</a></li>
      <li><a href="/school/auth/log-in.php">Log in</a></li>
      <li><a href="/school/auth/restricted.php">Restricted</a></li>
    </ul>
  </nav>
  <?php echo $content ?>
</body>
</html>
