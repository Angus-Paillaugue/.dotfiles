<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon/dark/favicon-32x32.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />
  </head>
  <body data-sveltekit-preload-data="hover">
    <section>
      <?php
      $dirs = scandir(".");
      foreach($dirs as $dir) {
        if(is_dir($dir) && $dir != "." && $dir != "..") {
          echo "<a href='$dir'>$dir</a><br>";
        }
      }
      ?>
    </section>
    <style>
      body {
        font-family: 'Poppins', sans-serif;
      }
      section {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 4px;
        width: 100%;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }

      a {
        padding: 8px 16px;
        border: none;
        border-radius: 6px;
        text-decoration: none;
        color: rgb(65, 28, 9);
        background-color: rgb(243, 141, 28);
      }
    </style>
  </body>
</html>
