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
  session_start();
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

  include '../lib/connector.php';
  include '../lib/components.php';

  $conn = sql_connector::getInstance('auth_test', 'localhost', 'school', "\$iutinfo");
  $loc = htmlspecialchars($_SERVER['PHP_SELF']) . '?' . http_build_query($_GET);
  $error = $_SESSION['error'] ?? null;
  unset($_SESSION['error']);

  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  	$username = $_POST['username'];
  	$password = $_POST['password'];
  	if (!isset($username) || !isset($password)) {
  		$error = 'Veuillez remplir tous les champs';
  	} else {
  		$username = htmlspecialchars($username);
  		$password = htmlspecialchars($password);
  		$rows = $conn->run_query('SELECT * FROM users WHERE username=?;', $username);
  		if (count($rows) > 0) {
  			$error = 'Cet utilisateur existe déjà';
  		} else {
  			$hashed_password = password_hash($password, PASSWORD_DEFAULT);
  			$conn->run_query(
  				'INSERT INTO users (username, password_hash) VALUES (?, ?);',
  				$username,
  				$hashed_password
  			);
  			header('Location: /school/auth/log-in.php', true, 303);
  		}
  	}
  	header("Location: $loc", true, 303);
  }
  ?>
  <div class="max-w-xl mx-auto w-full p-4 prose">
    <form action="<?php echo htmlspecialchars(
    	$_SERVER['PHP_SELF']
    ); ?>" method="post" class="p-4 border space-y-4 flex flex-col rounded-xl w-full bg-white">
      <h2 class="m-0">Créer un compte</h2>
      <?php
      echo $error;
      $usernameInput = Components::Input([
      	'id' => 'username',
      	'label' => 'Login',
      	'placeholder' => "Votre nom d'utilisateur",
      ]);
      $passwordInput = Components::Input([
      	'id' => 'password',
      	'label' => 'Mot de passe',
      	'placeholder' => 'Votre mot de passe',
      	'type' => 'password',
      ]);
      $submit = Components::Button([
      	'label' => 'Envoyer',
      	'variant' => 'primary',
      ]);
      echo $usernameInput;
      echo $passwordInput;
      if ($error) {
      	$alert = Components::Alert(['text' => $error, 'variant' => 'danger']);
      	echo $alert;
      }
      echo $submit;
      $createAccountLink = Components::Link([
      	'label' => 'Se connecter',
      	'href' => '/school/auth/log-in.php',
      ]);
      echo $createAccountLink;
      ?>
    </form>
  </div>
</body>
</html>
