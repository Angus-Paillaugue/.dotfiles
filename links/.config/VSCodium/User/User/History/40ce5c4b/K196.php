
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
    border: none;
    border-radius: 4px;
    text-decoration: none;
    color: #000;
    background-color: rgb(243, 141, 28);
  }
</style>
