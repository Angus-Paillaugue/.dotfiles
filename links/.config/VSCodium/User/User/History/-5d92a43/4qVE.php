<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>

  <section class="grid grid-cols-4 mx-auto max-w-screen-2xl p-4 gap-4">
    <?php
    $root = '/etienne/static/';
    $dirs = scandir('./static/');
    foreach ($dirs as $dir) {
      if (!is_dir($dir)) {
        $path = "$root$dir";
        echo "<img src='$path' class='rounded' />";
      }
    }
    ?>
  </section>
</body>
</html>
