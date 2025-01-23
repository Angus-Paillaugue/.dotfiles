<?php
require_once '../../../lib/connector.php';
class ModifierLesCoordonneesDunContact {
  private $id;
  private $adresse;
  private $telephone;
  private $codePostal;
  private $ville;
  private $conn;

  public function __construct($id, $adresse, $ville, $codePostal, $telephone) {
    $this->id = $id;
    $this->adresse = $adresse;
    $this->telephone = $telephone;
    $this->codePostal = $codePostal;
    $this->ville = $ville;
    $this->conn = sql_connector::getInstance('section4', 'localhost', 'school', '\$iutinfo');
  }

  public function exec() {
    $this->conn->run_query(
      'UPDATE contact SET adresse = ?, code_postal = ?, ville = ?, telephone = ? WHERE id = ?;',
      $this->adresse,
      $this->codePostal,
      $this->ville,
      $this->telephone,
      $this->id
    );
    return new Contact($this->id, $this->adresse, $this->ville, $this->codePostal, $this->telephone);
  }
}
?>
