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

// Perform query
if ($result = $mysqli -> query("SELECT * FROM test")) {
  echo "Returned rows are: " . $result -> num_rows;
  // Free result set
  $result -> free_result();
}

$mysqli -> close();
?>
