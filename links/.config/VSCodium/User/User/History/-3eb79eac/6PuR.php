<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Components</title>
  <link rel="stylesheet" href="../output.css">
</head>
<body>

<?php
  include_once 'button.php';
  include_once 'input.php';
  include_once 'alert.php';

  $components = array([
    "Buttons" => [
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
    ]
  ]);

  foreach ($components as $component) {
    $button = new Button($component['label'], $component['variant']);
    echo $button->construct();
  }
?>

  <div class="grid grid-grid-cols-1 lg:grid-cols-2 gap-8 max-w-screen-xl mx-auto p-8">
    <div class="border p-4 rounded-xl">
      <h1 class="text-2xl font-medium mb-4 underline">Buttons</h1>
      <div class="flex flex-row gap-4 flex-wrap">
        <button class="button" variant="primary">Primary</button>
        <button class="button" variant="secondary">Secondary</button>
        <button class="button" variant="ghost">Ghost</button>
        <button class="button" variant="danger">Danger</button>
        <button class="button" variant="warning">Warning</button>
        <button class="button" variant="info">Info</button>
        <button class="button" variant="success">Success</button>
        <button class="button" variant="light">Light</button>
        <button class="button" variant="square primary">X</button>
        <button class="button" variant="primary" disabled="true">Disabled</button>
      </div>
    </div>

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
