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
      $loc = htmlspecialchars($_SERVER["PHP_SELF"]). '?'.http_build_query($_GET);
      if($_SERVER["REQUEST_METHOD"] == "POST") {
        $login = $_POST["login"];
        $password = $_POST["password"];
        if($login == "admin" && $password == "admin") {
          setcookie("auth", true, time() + 3600);
        }
        header("Location: $loc");
      }else {
        $auth = $_COOKIE['auth'];
        $visitespageune = (intval($_COOKIE['visitespageune']) + 1) ?? 1;
        $visitespagedeux = (intval($_COOKIE['visitespagedeux']) + 1) ?? 1;
        if(isset($auth)) {
          echo "<h1>Bienvenue</h1>";
        } else {
          echo '
            <form action="'.$loc.'" method="post" class="p-4 border mb-8 gap-6 grid grid-cols-2 rounded-xl w-full bg-white">
            <h2 class="col-span-2 mb-4 mt-0">Access réservé aux personnes authentifiés</h2>
            <div class="flex flex-col">
              <label for="login">Login</label>
              <input type="text" name="login" placeholder="Votre nom d\'utilisateur">
            </div>
            <div class="flex flex-col">
              <label for="password">Mot de passe</label>
              <input type="password" name="password" placeholder="Votre mot de passe">
            </div>
            <button type="submit" variant="primary" class="button col-span-2">Envoyer</button>
          </form>';
        }
      }
    ?>

    <ul>
      <li><a href="pageune.php">Page une</a> visitée <?php echo $visitespageune; ?> fois</li>
      <li><a href="pagedeux.php">Page deux</a> visitée <?php echo $visitespagedeux; ?> fois</li>
    </ul>
  </div>

</body>
</html>
