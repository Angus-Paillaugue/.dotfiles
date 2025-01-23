<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon/dark/favicon-32x32.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Home</title>
    <link rel="stylesheet" href="school/output.css" />
  </head>
  <body>
    <section class="h-screen flex flex-row gap-2 flex-wrap max-w-screen-xl mx-auto w-full">
      <?php
      $dirs = scandir('.');
      require_once 'school/lib/components.php';
      foreach ($dirs as $dir) {
        if (is_dir($dir) && $dir != '.' && $dir != '..') {
          Components::Button([
            'label' => $dir,  // This is the directory name.
            'href' => $dir,
          ]);
        }
      }
      ?>
    </section>
  </body>
</html>
