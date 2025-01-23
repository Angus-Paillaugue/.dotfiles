<?php
$server= "localhost"; /* Nom d'hôte de la base de données */
$user= "root"; /* Nom d'utilisateur de la base de données */
$password= "APAILL40"; /* Mot de passe */
$database= "TP1"; /* Nom de la base de données */

$mysqli = new mysqli($server, $user,$password, $database);

// Check connection
if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}

$sql = "SELECT * FROM test;";
$result = $mysqli -> query($sql);

// Fetch all
 while ($row = mysqli_fetch_assoc($result))
 {
    echo $row['firstName'];
 }
// Free result set
$result -> free_result();

$mysqli -> close();
?>
