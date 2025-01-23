<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Formulaire</title>
  <link rel="stylesheet" href="/school/output.css">
</head>
<body>
  <form action="<?php echo htmlspecialchars(
    $_SERVER['PHP_SELF']
  ); ?>" method="POST" class="max-w-md w-full mt-10 grid grid-cols-2 mx-auto gap-2 border border-neutral-300 p-4 rounded">
    <label for="lastName">Votre nom</label>
    <input type="text" name="lastName" class="border border-neutral-300 rounded bg-white">
    <label for="age">Votre age</label>
    <input type="number" name="age" class="border border-neutral-300 rounded bg-white">
    <button type="reset" class="px-2 py-1 bg-white border border-neutral-300 rounded mt-2">
      Vider
    </button>
    <button type="submit" class="px-2 py-1 bg-white border border-neutral-300 rounded mt-2">
      Valider
    </button>

    <?php
    require '../lib/connector.php';
    $conn = sql_connector::getInstance('TP1', 'localhost', 'school', "\$iutinfo");

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $lastName = $_POST['lastName'];
      $age = $_POST['age'];
      if (empty($lastName) || empty($age)) {
        echo "<p class='col-span-2'>Votre nom et age sont obligatoires</p>";
      } else {
        $lastName = htmlspecialchars($lastName);
        $conn->run_query("INSERT INTO test (nom, age) VALUES ('$lastName', $age);");
      }
      $loc = $_SERVER['PHP_SELF'];
      header("Location: $loc", true, 303);
    }

    $rows = $conn->run_query('SELECT * FROM test;');
    echo "<table class='col-span-2 table-auto mt-4'>";
    echo "<tr class='border-b border-neutral-300 bg-white rounded-t'><th class='px-2 py-1'>Nom</th><th class='px-2 py-1'>Age</th></tr>";
    foreach ($rows as $row) {
      echo "<tr class='border-b border-neutral-300 last:border-none'><td class='px-2 py-1'>" .
        $row['nom'] .
        "</td><td class='px-2 py-1'>" .
        $row['age'] .
        '</td></tr>';
    }
    echo '</table>';
    ?>
  </form>
</body>
</html>
