<?php
$server= "localhost"; /* Nom d'hôte de la base de données */
$user= "root"; /* Nom d'utilisateur de la base de données */
$password= "APAILL40"; /* Mot de passe */
$database= "dbxxxxxx"; /* Nom de la base de données */
$table= "test"; /* Nom de la table, au choix */

/* Accès au serveur SQL et création de la table */
if ((!$link = mysqli_connect($server, $user, $password, $database)))
  die(printf("<H3>Serveur de la base de données non accessible: [%d] %s</H3>", mysqli_connect_errno(), mysqli_connect_error()));

if (!mysqli_query($link, "CREATE TABLE " . $table . "(name varchar(25),email varchar(25),id int(11))"))
  die(printf("<H3>La table ne peut pas être créée: [%d] %s</H3>", mysqli_connect_errno(), mysqli_connect_error()));

mysqli_close($link);
?>
