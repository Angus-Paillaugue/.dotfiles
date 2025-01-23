<?php
include '../lib/connector.php';

connect_to_db("TP1");

$data = run_query("SELECT * FROM test;");
var_dump($data);



$conn = new sql_connector('', '', '', '');

$data = $conn->run_query("SELECT * FROM test;");
var_dump($data);

?>
