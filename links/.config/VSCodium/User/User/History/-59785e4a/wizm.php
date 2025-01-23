<?php
require_once '../../../lib/connector.php';
require_once '../modele/Contact.php';
require_once '../modele/ContactDAO.php';

class CreerUnContact {
  private $nom;
  private $prenom;
  private $adresse;
  private $telephone;
  private $codePostal;
  private $ville;

  public function __construct($nom, $prenom, $adresse, $telephone, $codePostal, $ville) {
    $this->nom = $nom;
    $this->prenom = $prenom;
    $this->adresse = $adresse;
    $this->telephone = $telephone;
    $this->codePostal = $codePostal;
    $this->ville = $ville;
  }

  public function exec() {
    $contact = new Contact($this->nom, $this->prenom, $this->adresse, $this->telephone, $this->codePostal, $this->ville);
    $insertedRow = new ContactDAO().insert($contact);
    return $contact;
  }
}
?>
