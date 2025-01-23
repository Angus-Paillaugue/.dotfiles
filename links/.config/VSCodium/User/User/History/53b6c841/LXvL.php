<?php
include 'connector.php';

$sql = "SELECT * FROM test;";

$data = run_query($mysqli, $sql);
var_dump($data);
?>
