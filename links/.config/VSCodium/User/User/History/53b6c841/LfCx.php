<?php
include 'connector.php';

// $result = $mysqli -> query("SELECT * FROM test;");

$data = get($mysqli, "SELECT * FROM test;");
echo($data);
?>
