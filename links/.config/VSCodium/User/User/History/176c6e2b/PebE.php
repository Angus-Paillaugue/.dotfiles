<?php
require_once '../../../lib/connector.php';
class ModifierLesCoordonneesDunContact {
  private $id;
  private $nom;
  private $prenom;

  public function __construct($id, $) {
    $this->nom = $id;
    $this->prenom = $prenom;
    $this->conn = sql_connector::getInstance('section4', 'localhost', 'school', '\$iutinfo');
  }

  public function exec() {
    $contacts = [];
    $result = $this->conn->run_query('SELECT * FROM contacts WHERE nom = ? AND prenom = ?;', $this->nom, $this->prenom);
    foreach ($result as $row) {
      $contact = new Contact($row['nom'], $row['prenom'], $row['adresse'], $row['telephone'], $row['code_postal'], $row['ville']);
      $contact->setId($row['id']);
      $contacts[] = $contact;
    }
    return $contacts;
  }
}
?>
