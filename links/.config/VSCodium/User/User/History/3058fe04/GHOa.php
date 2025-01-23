<?php
if($method == "GET") {
  $id = $_POST["id"];
  require('../lib/connector.php');

  $conn = new sql_connector("section4", "localhost", "school", "\$iutinfo");
  $conn->run_query("DELETE FROM contracts WHERE id = ?;", [$id]);
  $loc = $_SERVER['PHP_SELF'];
  header("Location: ./index.php", true, 303);
}
?>
