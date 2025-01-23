
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contracts</title>
  <link rel="stylesheet" href="/output.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
</head>
<body>



  <div class="max-w-screen-lg mx-auto w-full p-4 prose">
    <?php
      require('../lib/connector.php');

      if (!isset($_GET['id'])) {
        echo "<div class='alert col-span-2' role='alert'>ID manquant</div>";
        exit();
      }
      $conn = new sql_connector("section4", "localhost", "school", "\$iutinfo");
    ?>
    <a href="index.php" class="button" variant="ghost square">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>
    </a>
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]). '?'.http_build_query($_GET);;?>" method="POST" class="p-4 border mb-8 grid grid-cols-2 gap-6 rounded-xl">
      <h1 class="col-span-2">Modifier un contract</h1>
      <?php
        $data = $conn->run_query("SELECT * FROM contracts WHERE id = ?;", $_GET['id']);
        $data = $data[0];

        if (empty($data)) {
          echo "<div class='alert col-span-2' role='alert'>ID invalide</div>";
          exit();
        }
      ?>
      <div class="flex flex-col">
        <label for="prenom">Prénom</label>
        <input type="text" name="prenom" placeholder="Votre prenom" value="<?php echo $data['prenom'] ?>">
      </div>
      <div class="flex flex-col">
        <label for="nom">Nom</label>
        <input type="text" name="nom" placeholder="Votre nom" value="<?php echo $data['nom'] ?>">
      </div>
      <div class="flex flex-col">
        <label for="adresse">Adresse</label>
        <input type="text" name="adresse" placeholder="Votre adresse" value="<?php echo $data['adresse'] ?>">
      </div>
      <div class="flex flex-col">
        <label for="code_postal">Code postal</label>
        <input type="text" name="code_postal" placeholder="Votre code postal" value="<?php echo $data['code_postal'] ?>">
      </div>
      <div class="flex flex-col">
        <label for="ville">Ville</label>
        <input type="text" name="ville" placeholder="Votre ville" value="<?php echo $data['ville'] ?>">
      </div>
      <div class="flex flex-col">
        <label for="telephone">N° tel</label>
        <input type="text" name="telephone" placeholder="Votre n° de téléphone" value="<?php echo $data['telephone'] ?>">
      </div>
      <button type="submit" variant="primary" class="button col-span-2">Enregistrer</button>
      <?php
        if($_SERVER["REQUEST_METHOD"] == "POST") {
          $prenom = $_POST["prenom"];
          $nom = $_POST["nom"];
          $adresse = $_POST["adresse"];
          $code_postal = $_POST["code_postal"];
          $ville = $_POST["ville"];
          $telephone = $_POST["telephone"];

          if (empty($prenom) || empty($nom) || empty($adresse) || empty($code_postal) || empty($ville) || empty($telephone)) {
            echo "<div class='alert col-span-2' role='alert'>Tous les champs sont obligatoires</div>";
          } else {
            $prenom = htmlspecialchars($prenom);
            $nom = htmlspecialchars($nom);
            $adresse = htmlspecialchars($adresse);
            $code_postal = htmlspecialchars($code_postal);
            $ville = htmlspecialchars($ville);
            $telephone = htmlspecialchars($telephone);

            $res = $conn->run_query(
              "UPDATE contracts SET nom=?,prenom=?,adresse=?,code_postal=?,ville=?,telephone=? WHERE id=?",
              $nom,
              $prenom,
              $adresse,
              $code_postal,
              $ville,
              $telephone,
              $_GET['id']
            );
            header("Location: index.php", true, 303);
          }
        }
      ?>
    </form>
  </div>

</body>
</html>
