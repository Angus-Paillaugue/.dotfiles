<?php
include 'connector.php';

connect_to_db("TP1");

$data = run_query($mysqli, "SELECT * FROM test;");
var_dump($data);

?>
