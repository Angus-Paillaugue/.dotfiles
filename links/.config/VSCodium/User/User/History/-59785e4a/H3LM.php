<?php
require_once '../../../lib/connector.php';

class CreerUnContact {
  private $conn;
  private $nom;
  private $prenom;
  private $adresse;
  private $telephone;
  private $codePostal;
  private $ville;

  public function __construct($nom, $prenom, $adresse, $telephone, $codePostal, $ville) {
    $this->conn = sql_connector::getInstance('section4', 'localhost', 'school', '\$iutinfo');
  }

  public function exec() {
    $contact = new Contact($this->nom, $this->prenom, $this->adresse, $this->telephone, $this->codePostal, $this->ville);
    $insertedRow = $this->conn->run_query('INSERT INTO contacts (nom, prenom, adresse, telephone, code_postal, ville) VALUES (?, ?, ?, ?, ?, ?);', $this->nom, $this->prenom, $this->adresse, $this->telephone, $this->codePostal, $this->ville);
    var_dump($insertedRow);
    $contact->setId($insertedRow['id']);
    return $contact;
  }
}
?>
