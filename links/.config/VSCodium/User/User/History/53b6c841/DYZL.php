<?php
include 'connector.php';

// $result = $mysqli -> query("SELECT * FROM test;");

$data = get($mysqli, "SELECT * FROM test;");
var_dump($data);
?>
