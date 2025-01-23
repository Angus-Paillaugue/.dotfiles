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
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

  class form {
    private $form;

    public function __construct($method = "POST", $action = "")
    {
      if($action == "") {
        $action = $_SERVER['PHP_SELF'];
      }
      if($method != "GET" && $method != "POST") {
        echo "Error: Invalid method";
        exit();
      }

      $this->form = "
      <form method='$method' action='$action'><fieldset class='p-4 border border-neutral-800 max-w-sm mx-auto w-full mt-10 grid grid-cols-2 gap-2'>
      ";
    }

    public function setInput($id, $label, $type, $value = '') {
      $input = "<label for='$id'>$label</label><input type='$type' value='$value' name='$id' class='border border-neutral-300 rounded bg-white'>";
      $this->form .= $input;
    }

    public function setCustomHTML($html) {
      $this->form .= $html;
    }

    public function setButton($label, $variant = "primary", $type = "submit") {
      $button = "<button type='submit' class='button' variant='$variant' type='$type'>$label</button>";
      $this->form .= $button;
    }

    public function setSelect($id, $label, $options) {
      $select = "<label for='$id'>$label</label><select name='$id' id='$id'>";
      foreach($options as $option) {
        $select .= "<option value='$option'>$option</option>";
      }
      $select .= "</select>";
      $this->form .= $select;
    }

    public function getForm() {
      return $this->form."</fieldset></form>";
    }
  }


  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $num1 = $_POST["num1"];
    $num2 = $_POST["num2"];
    $operator = $_POST["operator"];
    if (empty($num1) || empty($num2)) {
      
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
  $form = new form();
  $form->setInput("num1", "Nombre 1", "number");
  $form->setInput("num2", "Number 2", "number");
  $form->setCustomHTML('<label for="result">Résultat</label><output name="result"></output>');
  $form->setSelect("operator", "Opérateur", array("add", "subtract", "multiply", "divide"));
  $form->setButton("Calculer");
  echo $form->getForm();
?>
</body>
</html>
