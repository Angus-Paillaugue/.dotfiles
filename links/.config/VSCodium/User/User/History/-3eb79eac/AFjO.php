<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Components</title>
  <link rel="stylesheet" href="../output.css">
</head>
<body>


  <div class="grid grid-grid-cols-1 lg:grid-cols-2 gap-8 max-w-screen-xl mx-auto p-8">
    <?php
      include_once 'button.php';
      include_once 'input.php';
      include_once 'alert.php';

      $components = array([
        "Buttons" => array([
          "label" => "Primary",
          "variant" => "primary"
        ], [
          "label" => "Secondary",
          "variant" => "secondary"
        ], [
          "label" => "Ghost",
          "variant" => "ghost"
        ], [
          "label" => "Danger",
          "variant" => "danger"
        ], [
          "label" => "Warning",
          "variant" => "warning"
        ], [
          "label" => "Info",
          "variant" => "info"
        ], [
          "label" => "Success",
          "variant" => "success"
        ], [
          "label" => "Light",
          "variant" => "light"
        ], [
          "label" => "X",
          "variant" => "square primary"
        ], [
          "label" => "Disabled",
          "variant" => "primary",
          "disabled" => true
        ]),
        "Inputs" => []
      ]);

      foreach ($components as $category => $components) {
        echo "<div class='border p-4 rounded-xl'>";
        echo "<h1 class='text-2xl font-medium mb-4 underline'>$category</h1>";
        echo "<div class='flex flex-row gap-4 flex-wrap'>";
        foreach ($components as $component) {
          $button = new Button(['label' => $component['label'], 'variant' => $component['variant'], 'disabled' => $component['disabled']]);
          echo $button->construct();
        }
        echo "</div>";
        echo "</div>";
      }
    ?>

    <div class="border p-4 rounded-xl">
      <h1 class="text-2xl font-medium mb-4 underline">Inputs</h1>
      <div class="flex flex-row gap-4 flex-wrap">
        <input type="text" placeholder="Placeholder">
        <div class="block w-full">
          <label for="input">Label</label>
          <input type="text" id="input" placeholder="Placeholder">
        </div>
      </div>
    </div>

    <div class="border p-4 rounded-xl">
      <h1 class="text-2xl font-medium mb-4 underline">Alerts</h1>
      <div class="flex flex-row gap-4 flex-wrap">
        <div class="alert" variant="danger">Danger Alert</div>
        <div class="alert" variant="warning">Warning Alert</div>
        <div class="alert" variant="success">Success Alert</div>
        <div class="alert" variant="info">Info Alert</div>
      </div>
    </div>
  </div>

</body>
</html>
