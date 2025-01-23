<?php
class CreerUnContact {
  private $conn;

  public function __construct() {
    $this->conn = sql_connector::getInstance('section4', 'localhost', 'school', '\$iutinfo');
  }

  public function exec($nom, $prenom, $adresse, $telephone, $codePostal, $ville) {
    $contact = new Contact($nom, $prenom, $adresse, $telephone, $codePostal, $ville);
    $this->conn->run_query('INSERT INTO contacts (nom, prenom, adresse, telephone, codePostal, ville) VALUES (?, ?, ?, ?, ?, ?);', $nom, $prenom, $adresse, $telephone, $codePostal, $ville);
    return $contact;
  }
}
?>
