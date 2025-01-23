<?php
include 'connector.php';

$sql = "SELECT * FROM test;";
$result = $mysqli -> query($sql);

// Fetch all
 while ($row = mysqli_fetch_assoc($result))
 {
    foreach ($row as $key => $value)
    {
        echo $key . " : " . $value . "<br>";
    }
 }
// Free result set
$result -> free_result();

$mysqli -> close();
?>
