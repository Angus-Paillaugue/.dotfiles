<?php
require_once '../../../lib/connector.php';

class CreerUnContact {
  private $conn;

  public function __construct($nom, $prenom, $adresse, $telephone, $codePostal, $ville) {
    $this->conn = sql_connector::getInstance('section4', 'localhost', 'school', '\$iutinfo');
  }

  public function exec() {
    $contact = new Contact($nom, $prenom, $adresse, $telephone, $codePostal, $ville);
    $insertedRow = $this->conn->run_query('INSERT INTO contacts (nom, prenom, adresse, telephone, code_postal, ville) VALUES (?, ?, ?, ?, ?, ?);', $nom, $prenom, $adresse, $telephone, $codePostal, $ville);
    var_dump($insertedRow);
    $contact->setId($insertedRow['id']);
    return $contact;
  }
}
?>
