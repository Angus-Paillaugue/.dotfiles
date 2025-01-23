<?php
require('../lib/connector.php');
if($method == "GET") {
  $id = $_GET["id"];

  $conn = new sql_connector("section4", "localhost", "school", "\$iutinfo");
  $conn->run_query("DELETE FROM contracts WHERE id = ?;", [$id]);
  header("Location: ./index.php", true, 303);
}
?>
