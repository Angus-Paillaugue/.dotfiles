<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign-up</title>
  <link rel="stylesheet" href="/output.css">
</head>
<body>
  <?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    require('../lib/connector.php');
    require('../lib/components.php');

    $conn = sql_connector::getInstance("auth_test", "localhost", "school", "\$iutinfo");

    $loc = htmlspecialchars($_SERVER["PHP_SELF"]). '?'.http_build_query($_GET);
    $error = null;
    if($_SERVER["REQUEST_METHOD"] == "POST") {
      $username = $_POST["username"];
      $password = $_POST["password"];
      if(!isset($username) || !isset($password)) {
        echo "werkijfgnwriekjnfgiewkrj";
      }else {
        $username = htmlspecialchars($username);
        $password = htmlspecialchars($password);
        $rows = $conn->run_query("SELECT * FROM users WHERE username='$username' AND password='$password';");
        if(count($rows) == 0) {
          $error = true;
          $alert = "Nom d'utilisateur ou mot de passe incorrect";
        } else {
          $loc = "/auth/welcome.php";
        }
        header("Location: $loc", true, 303);
      }
    }
    echo "Veuillez remplir tous les champs";
  ?>
  <div class="max-w-xl mx-auto w-full p-4 prose">
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post" class="p-4 border space-y-4 flex flex-col rounded-xl w-full bg-white">
      <h2 class="m-0">Se connecter</h2>
      <?php
        $usernameInput = new Input([
          "id" => "username",
          "label" => "Login",
          "placeholder" => "Votre nom d'utilisateur"
        ]);
        $passwordInput = new Input([
          "id" => "password",
          "label" => "Mot de passe",
          "placeholder" => "Votre mot de passe",
          "type" => "password"
        ]);
        $submit = new Button([
          "label" => "Envoyer",
          "variant" => "primary"
        ]);
        echo $usernameInput->construct();
        echo $passwordInput->construct();
        if($error) {
          $alert = new Alert(['text' => $alert, 'variant' => 'danger']);
          echo $alert->construct();
        }
        echo $submit->construct();
      ?>
    </form>
  </div>
</body>
</html>
