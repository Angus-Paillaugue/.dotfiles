<?php
require_once '../../../lib/connector.php';
require_once '../modele/Contact.php';
require_once '../modele/ContactDAO.php';

class ModifierLModifierLIdentiteDUnContactesCoordonneesDunContact {
  private $id;
  private $nom;
  private $prenom;
  private $DAO;

  public function __construct($id, $nom, $prenom) {
    $this->id = $id;
    $this->nom = $nom;
    $this->prenom = $prenom;
    $this->DAO = new ContactDAO();
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
