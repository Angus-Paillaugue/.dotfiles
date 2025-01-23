<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Formulaire</title>
  <link rel="stylesheet" href="/school/output.css">
</head>
<body>
  <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST">
    <fieldset class="p-4 border border-neutral-800 max-w-sm mx-auto w-full mt-10 grid grid-cols-2 gap-2">
      <legend>Calculatrice en ligne</legend>
      <label for="num1">Nombre 1</label>
      <input type="number" name="num1" class="border border-neutral-300 rounded bg-white">
      <label for="num2">Nombre 2</label>
      <input type="number" name="num2" class="border border-neutral-300 rounded bg-white">
      <label for="result">Résultat</label>
      <output name="result">
        <?php if ($_SERVER['REQUEST_METHOD'] == 'POST') {
          $num1 = $_POST['num1'];
          $num2 = $_POST['num2'];
          $operator = $_POST['operator'];
          if (empty($num1) || empty($num2)) {
            echo '0';
          } else {
            switch ($operator) {
              case 'add':
                echo $num1 + $num2;
                break;
              case 'subtract':
                echo $num1 - $num2;
                break;
              case 'multiply':
                echo $num1 * $num2;
                break;
              case 'divide':
                echo $num1 / $num2;
                break;
            }
          }
        } ?>
      </output>
      <label for="operator">Opérateur</label>
      <select name="operator" id="operator">
        <option value="add">Additionner</option>
        <option value="subtract">Soustraire</option>
        <option value="multiply">Multiplier</option>
        <option value="divide">Diviser</option>
      </select>
      <button type="submit" class="px-2 py-1 bg-white border border-neutral-300 rounded col-span-2">
        Calculer
      </button>
    </fieldset>
  </form>
</body>
</html>
