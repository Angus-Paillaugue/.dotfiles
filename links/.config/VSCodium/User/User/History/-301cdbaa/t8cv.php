
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

<?php
  require('../lib/connector.php');

  $conn = new sql_connector("section4", "localhost", "school", "\$iutinfo");
?>


  <div class="max-w-screen-lg mx-auto w-full p-4 prose">
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="POST" class="p-4 border mb-8 grid grid-cols-2 gap-6 rounded-xl">
      <h1 class="col-span-2">Modifier un contract</h1>
      <?php
      $data = $conn->run_query("SELECT * FROM contracts ORDER BY id;");
      echo "
        <h1>Contracts</h1>
        <table class='table-auto border-collapse text-sm w-full rounded border m-0'>
          <thead>
            <tr>
              <th class='py-0.5 px-2'>Nom</th
              ><th class='py-0.5 px-2'>Prénom</th>
              <th class='py-0.5 px-2'>Adresse</th>
              <th class='py-0.5 px-2'>Code postal</th>
              <th class='py-0.5 px-2'>Ville</th>
              <th class='py-0.5 px-2'>Téléphone</th>
              <th class='py-0.5 px-2'>Actions</th>
            </tr>
          </thead>
      ";
      foreach ($data as $row) {
        echo "
          <tr class='border-y odd:bg-neutral-100'>
            <td class='py-0.5 px-2'>".$row['nom']."</td>
            <td class='py-0.5 px-2'>".$row['prenom']."</td>
            <td class='py-0.5 px-2'>".$row['adresse']."</td>
            <td class='py-0.5 px-2'>".$row['code_postal']."</td>
            <td class='py-0.5 px-2'>".$row['ville']."</td>
            <td class='py-0.5 px-2'>".$row['telephone']."</td>
            <td class='py-0.5 px-2'>
              <button class='p-1 rounded-full relative group'>
                <svg xmlns='http://www.w3.org/2000/svg' class='size-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-ellipsis-vertical'><circle cx='12' cy='12' r='1'/><circle cx='12' cy='5' r='1'/><circle cx='12' cy='19' r='1'/></svg>
                <div class='absolute top-full -mt-1 bg-white z-10 right-0 hidden group-hover:flex hover:flex flex-col w-fit rounded-xl overflow-hidden border shadow-sm'>
                  <a href='edit.php?id=".$row['id']."' class='px-4 py-2 no-underline transition-colors hover:bg-neutral-100'>Modifier</a>
                  <a href='delete.php?id=".$row['id']."' class='px-4 py-2 no-underline transition-colors hover:bg-neutral-100'>Supprimer</a>
                </div>
              </button>
            </td>
          </tr>
        ";
      }

      echo "</table>";
    ?>
      <div class="flex flex-col">
        <label for="prenom">Prénom</label>
        <input type="text" name="prenom" placeholder="Votre prenom" value="Angus">
      </div>
      <div class="flex flex-col">
        <label for="nom">Nom</label>
        <input type="text" name="nom" placeholder="Votre nom" value="Paillaugue">
      </div>
      <div class="flex flex-col">
        <label for="adresse">Adresse</label>
        <input type="text" name="adresse" placeholder="Votre adresse">
      </div>
      <div class="flex flex-col">
        <label for="code_postal">Code postal</label>
        <input type="text" name="code_postal" placeholder="Votre code postal">
      </div>
      <div class="flex flex-col">
        <label for="ville">Ville</label>
        <input type="text" name="ville" placeholder="Votre ville">
      </div>
      <div class="flex flex-col">
        <label for="telephone">N° tel</label>
        <input type="text" name="telephone" placeholder="Votre n° de téléphone">
      </div>
      <button type="submit" variant="primary" class="col-span-2">Enregistrer</button>
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
            $loc = $_SERVER['PHP_SELF'];
            header("Location: $loc", true, 303);
          }
        }
      ?>
    </form>
  </div>

</body>
</html>
