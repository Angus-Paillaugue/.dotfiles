<?php
if($method == "GET") {
  $id = $_POST["id"];
  $conn->run_query("DELETE FROM contracts WHERE id = ?;", [$id]);
  $loc = $_SERVER['PHP_SELF'];
  header("Location: ./", true, 303);
}
?>
