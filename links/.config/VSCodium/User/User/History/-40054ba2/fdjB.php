<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome</title>
  <link rel="stylesheet" href="../../output.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
</head>
<body>

  <div class="max-w-screen-sm mx-auto w-full p-4 prose">
    <?php
      $auth = $_COOKIE['auth'];
      if(!isset($auth)) {
        header("Location: auth.php");
      } else {
        $visitespagedeux = (intval($_COOKIE['visitespagedeux']) + 1) ?? 1;
        setcookie("visitespagedeux", $visitespagedeux, time() + 3600);
      }
    ?>

    <h1>Bienvenu sur la page deux</h1>
  </div>

</body>
</html>
