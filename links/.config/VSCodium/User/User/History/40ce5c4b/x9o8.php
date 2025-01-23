<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Home</title>
    <link rel="stylesheet" href="output.css" />
  </head>
  <body>
    <section class="h-screen flex flex-row items-center justify-center gap-2 flex-wrap max-w-screen-xl mx-auto w-full">
      <?php
      $dirs = scandir('.');
      require_once 'lib/components.php';
      foreach ($dirs as $dir) {
        if (is_dir($dir) && $dir != '.' && $dir != '..') {
          Components::Button([
            'label' => $dir,
            'href' => $dir,
          ]);
        }
      }
      ?>
    </section>
  </body>
</html>
