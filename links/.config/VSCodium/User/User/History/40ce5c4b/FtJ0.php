
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
    padding: 8px;
    border: 1px solid #000;
    border-radius: 4px;
    text-decoration: none;
    color: #000;
    background-color: #f0f0f0;
  }
</style>
