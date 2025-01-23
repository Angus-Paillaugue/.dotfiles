<?php
$server= "localhost"; /* Nom d'hôte de la base de données */
$user= "root"; /* Nom d'utilisateur de la base de données */
$password= "APAILL40"; /* Mot de passe */
$database= "TP1"; /* Nom de la base de données */
$table= "test"; /* Nom de la table, au choix */

/* Accès au serveur SQL et création de la table */
if ((!$link = mysqli_connect($server, $user, $password, $database)))
  die(printf("<H3>Serveur de la base de données non accessible: [%d] %s</H3>", mysqli_connect_errno(), mysqli_connect_error()));

  $users = mysqli_query($link, "SELECT * FROM test WHERE 1; ");
if (!$users)
  die(printf("<H3>La table ne peut pas être lister: [%d] %s</H3>", mysqli_connect_errno(), mysqli_connect_error()));

mysqli_close($link);

/* Affichage de la table */
var_dump($users);
?>
