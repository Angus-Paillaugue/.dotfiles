<?php
require_once '../modele/User.php';
require_once '../modele/UserDAO.php';

class CreerUnJoueur {
  private $username;
  private $password_hash;

  public function __construct($username, $password_hash) {
    $this->username = $username;
    $this->password_hash = $password_hash;
    $this->DAO = new UserDAO();
  }

  public function exec() {
    $joueur = new User($this->nom, $this->prenom, $this->numero_licence, $this->date_naissance, $this->taille, $this->poids, $this->statut, $this->commentaire);
    $insertedRow = $this->DAO->insert($joueur);
    $joueur->setId($insertedRow['id']);
    return $joueur;
  }
}
?>
