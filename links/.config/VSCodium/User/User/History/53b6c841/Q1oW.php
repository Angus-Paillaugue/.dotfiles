<?php
include 'connector.php';

$result = $mysqli -> query("SELECT * FROM test;");

$data = get($mysqli, $sql);
var_dump($data);
?>
