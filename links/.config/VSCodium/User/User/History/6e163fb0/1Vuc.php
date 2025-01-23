<?php
require_once '../modele/Contact.php';
require_once '../modele/ContactDAO.php';

class CreerUnJoueur {
  private $nom;
  private $prenom;
  private $adresse;
  private $telephone;
  private $codePostal;
  private $ville;
  private $DAO;

  public function __construct($nom, $prenom, $adresse, $telephone, $codePostal, $ville) {
    $this->nom = $nom;
    $this->prenom = $prenom;
    $this->adresse = $adresse;
    $this->telephone = $telephone;
    $this->codePostal = $codePostal;
    $this->ville = $ville;
    $this->DAO = new JoueurDAO();
  }

  public function exec() {
    $contact = new Joueur($this->nom, $this->prenom, $this->adresse, $this->telephone, $this->codePostal, $this->ville);
    $insertedRow = $this->DAO->insert($contact);
    $contact->setId($insertedRow['id']);
    return $contact;
  }
}
?>
