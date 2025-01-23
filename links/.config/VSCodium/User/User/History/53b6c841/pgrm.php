<?php
include 'connector.php';

connect_to_db("TP1");

$sql = "SELECT * FROM test;";

$data = run_query($mysqli, $sql);
var_dump($data);
?>
