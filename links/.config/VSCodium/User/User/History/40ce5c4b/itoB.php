
<section class="container">
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
  section.container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 4px;
    width: 100%;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
</style>
