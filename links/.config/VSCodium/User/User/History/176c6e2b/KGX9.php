<?php
require_once '../../../lib/connector.php';
require_once '../modele/Contact.php';
require_once '../modele/ContactDAO.php';

class ModifierLesCoordonneesDunContact {
  private $id;
  private $adresse;
  private $telephone;
  private $codePostal;
  private $ville;
  private $DAO;

  public function __construct($id, $adresse, $ville, $codePostal, $telephone) {
    $this->id = $id;
    $this->adresse = $adresse;
    $this->telephone = $telephone;
    $this->codePostal = $codePostal;
    $this->ville = $ville;
    $this->DAO = new ContactDAO();
  }

  public function exec() {
    $contact = new Contact($this->id, '', '', $this->adresse, $this->telephone, $this->codePostal, $this->ville);
    $this->DAO->update($contact);
  }
}
?>
