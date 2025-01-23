<?php
require_once '../../../lib/connector.php';
require_once '../modele/Contact.php';
require_once '../modele/ContactDAO.php';

class ModifierLModifierLIdentiteDUnContactesCoordonneesDunContact {
  private $contact;
  private $nom;
  private $prenom;
  private $DAO;

  public function __construct($contact, $nom, $prenom) {
    $this->contact = $contact;
    $this->nom = $nom;
    $this->prenom = $prenom;
    $this->DAO = new ContactDAO();
  }

  public function exec() {
    $this->contact->setNom($this->nom ?? $this->contact->getNom());
    $this->contact->setPrenom($this->prenom ?? $this->contact->getPrenom());
    $this->DAO->update($this->contact);
  }
}
?>
