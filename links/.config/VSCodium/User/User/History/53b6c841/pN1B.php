<?php
include('../lib/connector.php');

$conn = new sql_connector("TP1", "localhost", "scool", "\$iutinfo");

$data = $conn->run_query("SELECT * FROM test;");
var_dump($data);

?>
