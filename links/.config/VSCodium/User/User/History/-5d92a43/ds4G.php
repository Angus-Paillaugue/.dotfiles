<section>
  <?php
  $dirs = scandir('./static/');
  $root = '/etienne/static/';
  foreach ($dirs as $dir) {
    if (!is_dir($dir)) {
      echo "<img src='$root$dir' />";
    }
  }
  ?>
</section>
