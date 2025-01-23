<?php
require_once '../../../lib/connector.php';
require_once '../modele/Contact.php';
require_once '../modele/ContactDAO.php';

class ModifierLesCoordonneesDunContact {
  private $contact;
  private $adresse;
  private $telephone;
  private $codePostal;
  private $ville;
  private $DAO;

  public function __construct($contact, $adresse, $ville, $codePostal, $telephone) {
    $this->contact = $contact;
    $this->adresse = $adresse;
    $this->telephone = $telephone;
    $this->codePostal = $codePostal;
    $this->ville = $ville;
    $this->DAO = new ContactDAO();
  }

  public function exec() {
    $this->contact->setAdresse($this->adresse ?? $this->contact->getAdresse());
    $this->contact->setTelephone($this->telephone ?? $this->contact->getTelephone());
    $this->contact->setCodePostal($this->codePostal ?? $this->contact->getCodePostal());
    $this->contact->setVille($this->ville ?? $this->contact->getVille());
    $this->DAO->update($this->contact);
  }
}
?>
