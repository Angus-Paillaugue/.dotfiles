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
      if($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = $_POST["nom"];
        setcookie("name", $name, time() + 3600);
        header("Location: index.php");
      }else {
        $name = $_COOKIE['name'];
        $visites = ($_COOKIE['visites'] || 0) + 1;
        setcookie("visites", $visites, time() + 3600);
        if(isset($name)) {
          echo "<h1>Bienvenue Monsieur $name</h1>";
        } else {
          $loc = htmlspecialchars($_SERVER["PHP_SELF"]). '?'.http_build_query($_GET);
          echo '
            <form action="'.$loc.'" method="post" class="p-4 border mb-8 gap-6 flex flex-col rounded-xl w-full bg-white">
            <h1 class="col-span-2 mb-4">Quel est votre nom ?</h1>
            <div class="flex flex-col">
              <label for="nom">Nom</label>
              <input type="text" name="nom" placeholder="Votre nom">
            </div>
            <button type="submit" variant="primary" class="button">Valider</button>
          </form>';
        }

        echo "<p>Vous avez visité cette page $visites fois</p>";
      }
    ?>
  </div>

</body>
</html>
