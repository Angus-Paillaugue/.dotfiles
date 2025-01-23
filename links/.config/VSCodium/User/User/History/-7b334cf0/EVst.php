<?php
require_once __DIR__ . '/../modele/Commentaire.php';
require_once __DIR__ . '/../modele/CommentaireDAO.php';

class CreerUnJoueur
{
  private $id_joueur;
contenu  private $DAO;

  public function __construct(
    $nom,
    $prenom,
    $numero_licence,
    $date_naissance,
    $taille,
    $poids,
    $statut,
    $commentaire
  ) {
    $this->nom = $nom;
    $this->prenom = $prenom;
    $this->numero_licence = $numero_licence;
    $this->date_naissance = $date_naissance;
    $this->taille = $taille;
    $this->poids = $poids;
    $this->statut = $statut;
    $this->commentaire = $commentaire;
    $this->DAO = new JoueurDAO();
  }

  public function execute()
  {
    $joueur = new Joueur(
      $this->nom,
      $this->prenom,
      $this->numero_licence,
      $this->date_naissance,
      $this->taille,
      $this->poids,
      $this->statut,
      []
    );
    $insertedRow = $this->DAO->insert($joueur);
    $joueur->setId($insertedRow['id']);
    return $joueur;
  }
}
?>
