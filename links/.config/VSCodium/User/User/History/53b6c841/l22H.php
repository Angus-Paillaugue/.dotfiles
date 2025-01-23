<?php # http://www.info.univ-angers.fr/pub/gh/demo.php

 # connexion sur forge pour l'utilisateur anonymous,
 # mot de passe anonymous :
 $tdc2 = mysql_connect("localhost","anonymous","anonymous")
          or die("problème de connexion") ;

 # ouverture de la base de données
 $tdc3 = mysql_select_db("statdata") ;

 # création d'une table

 $crt  = "" ;
 $crt .= " create table demo (           "  ;
 $crt .= "  num INT auto_increment ,     "  ;
 $crt .= "  nom VARCHAR(50) ,            "  ;
 $crt .= "  age INT ,                    "  ;
 $crt .= "  KEY num (num)                "  ;
 $crt .= " )                             "  ;
 $sql = mysql_query("$crt") ;


 # ajout de données

 $aga = rand(20,80) ;
 $ajo = " insert into demo (nom,age) values (\"?\",$aga) " ;
 $sql = mysql_query("$ajo") ;

 # interrogation
 #   rappel : on exécute la requete avec mysql_query
 #            et on convertit en tableau chaque ligne retournée par la requete
 #            avec mysql_fetch_array

 $question  = " SELECT COUNT(*)  FROM  statdata.demo  " ;
 $reponse   = mysql_query($question) ;
 $tableau   = mysql_fetch_array($reponse) ;
 $nbe       = $tableau["COUNT(*)"] ;
 echo "<h2> la table demo contient $nbe enregistrements</h2>" ;

 $cha   = "age" ;
 $req2  = " SELECT $cha , NOM  FROM  statdata.demo  " ;
 $res2  = mysql_query($req2) ;
 $rec = 0 ;
 while ($ligr=mysql_fetch_array($res2)) {
   $rec++ ;
   $nom    = $ligr["NOM"] ;
   $age    = $ligr[$cha] ;
   echo " personne numéro $rec nom = $nom age = $age <p>\n";
 } ; # fin de tant que

?>
