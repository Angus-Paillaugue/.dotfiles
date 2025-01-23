<?php
require('../lib/connector.php');
if($_SERVER["REQUEST_METHOD"] == "GET") {
  $id = $_GET["id"];
  echo "$id";
  $conn = new sql_connector("section4", "localhost", "school", "\$iutinfo");
  $conn->run_query("DELETE FROM contracts WHERE id = ?;", [$id]);
  // header("Location: ./index.php", true, 303);
}
?>
