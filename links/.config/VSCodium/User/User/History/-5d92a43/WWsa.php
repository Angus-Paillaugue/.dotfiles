<section>
  <?php
  $dirs = scandir('./static/');
  foreach ($dirs as $dir) {
    if (is_dir($dir) && $dir != '.' && $dir != '..') {
      echo "<a href='$dir'>$dir</a><br>";
    }
  }
  ?>
</section>
