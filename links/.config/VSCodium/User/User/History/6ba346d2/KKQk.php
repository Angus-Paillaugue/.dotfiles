<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon/dark/favicon-32x32.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <section>
      <?php
      $dirs = scandir('.');
      require_once 'school/lib/components.php';
      foreach ($dirs as $dir) {
        if (is_dir($dir) && $dir != '.' && $dir != '..') {
          Components::link('primary', $dir, $dir);
          echo "<a href='$dir'>$dir</a><br>";
        }
      }
      ?>
    </section>
  </body>
</html>
