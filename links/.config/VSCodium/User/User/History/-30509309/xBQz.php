<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Formulaire</title>
  <link rel="stylesheet" href="/output.css">
</head>
<body>
<?php
  class form {
    private $form;
    public function __construct($method, $action)
    {
      if($method == "" || $action == "") {
        echo "Error: Missing parameters";
        exit();
      }
      if($method != "GET" && $method != "POST") {
        echo "Error: Invalid method";
        exit();
      }

      $this->form = `
        <form method="$method"><fieldset class="p-4 border border-neutral-800 max-w-sm mx-auto w-full mt-10 grid grid-cols-2 gap-2">
      `;
    }

    public function settext($id, $label, $type) {
      $input = "<label for='$id'>$label</label><input type='$type' name='$id' class='border border-neutral-300 rounded bg-white'>";
      $this->form += $input;
    }

    public function setoutput($id) {
      $output = "<label for='$id'>$id</label><output name='$id'></output>";
      $this->form += $output;
    }

    public function setselect($id, $label, ...$options) {
      $select = "<label for='$id'>$label</label><select name='$id' id='$id'>";
      foreach($options as $option) {
        $select += "<option value='$option'>$option</option>";
      }
      $select += "</select>";
      $this->form += $select;
    }

    public function getform() {
      return $this->form + "</fieldset></form>";
    }
  }

  $form = new form("POST", "index.php");
  $form->settext("num1", "Nombre 1", "number");
  $form->settext("num2", "Number 2", "number");
  $form->settext("result", "output");
  $form->setselect("operator", "Opérateur", "add", "subtract", "multiply", "divide");
  echo $form->getform();
?>

  <!-- <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="POST">
    <fieldset class="p-4 border border-neutral-800 max-w-sm mx-auto w-full mt-10 grid grid-cols-2 gap-2">
      <legend>Calculatrice en ligne</legend>
      <label for="num1">Nombre 1</label>
      <input type="number" name="num1" class="border border-neutral-300 rounded bg-white">
      <label for="num2">Nombre 2</label>
      <input type="number" name="num2" class="border border-neutral-300 rounded bg-white">
      <label for="result">Résultat</label>
      <output name="result">
        <?php
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
          $num1 = $_POST["num1"];
          $num2 = $_POST["num2"];
          $operator = $_POST["operator"];
          if (empty($num1) || empty($num2)) {
            echo "0";
          } else {
            switch ($operator) {
              case "add":
                echo $num1 + $num2;
                break;
              case "subtract":
                echo $num1 - $num2;
                break;
              case "multiply":
                echo $num1 * $num2;
                break;
              case "divide":
                echo $num1 / $num2;
                break;
            }
          }
        }
        ?>
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
  </form> -->
</body>
</html>
