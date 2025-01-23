<?php
require_once '../modele/Joueur.php';
require_once '../modele/JoueurDAO.php';

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
    $joueur = new Joueur($this->nom, $this->prenom, $this->adresse, $this->telephone, $this->codePostal, $this->ville);
    $insertedRow = $this->DAO->insert($contact);
    $joueur->setId($insertedRow['id']);
    return $joueur;
  }
}
?>
