<section>
  <?php
  $dirs = scandir('./static/');
  foreach ($dirs as $dir) {
    if (!is_dir($dir)) {
      echo "<img src='${}' />";
    }
  }
  ?>
</section>
