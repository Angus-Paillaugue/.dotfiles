<?php
require_once '../../../lib/connector.php';
class ModifierLModifierLIdentiteDUnContactesCoordonneesDunContact {
  private $id;
  private $nom;
  private $prenom;
  private $conn;

  public function __construct($id, $nom, $prenom) {
    $this->id = $id;
    $this->nom = $nom;
    $this->prenom = $prenom;
    $this->conn = sql_connector::getInstance('section4', 'localhost', 'school', '\$iutinfo');
  }

  public function exec() {
    $this->conn->run_query(
      'UPDATE contact SET nom = ?, prenom = ? WHERE id = ?;',
      $this->nom,
      $this->prenom,
      $this->id
    );
  }
}
?>
