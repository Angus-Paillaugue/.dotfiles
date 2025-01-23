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
    public function __construct($method = "POST", $action = "")
    {
      if($action == "") {
        $action = $_SERVER['PHP_SELF'];
      }
      if($method != "GET" && $method != "POST") {
        echo "Error: Invalid method";
        exit();
      }

      $this->form = `
        <form method="$method" action="$action"><fieldset class="p-4 border border-neutral-800 max-w-sm mx-auto w-full mt-10 grid grid-cols-2 gap-2">
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

  echo "test";
  $form = new form();
  $form->settext("num1", "Nombre 1", "number");
  $form->settext("num2", "Number 2", "number");
  $form->settext("result", "", "output");
  $form->setselect("operator", "Opérateur", "add", "subtract", "multiply", "divide");
  echo $form->getform();
?>
</body>
</html>
