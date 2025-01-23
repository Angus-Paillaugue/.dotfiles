
<div class="flex flex-row flex-wrap gap-4 w-full items-center justify-center h-screen">
  <?php
  $dirs = scandir(".");
  foreach($dirs as $dir) {
    if(is_dir($dir) && $dir != "." && $dir != "..") {
      echo "<a href='$dir'>$dir</a><br>";
    }
  }
  ?>
</div>
