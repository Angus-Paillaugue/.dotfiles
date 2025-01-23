<?php
class Joueur {
  private $id;
  private $nom;
  private $prenom;
  private $numero_licence;
  private $date_naissance;
  private $taille;
  private $poids;
  private $statut;
  private $commentaire;

  public function __construct($id, $nom, $prenom, $numero_licence, $date_naissance, $taille, $poids, $statut, $commentaire) {
    $this->id = $id;
    $this->nom = $nom;
    $this->prenom = $prenom;
    $this->numero_licence = $numero_licence;
    $this->date_naissance = $date_naissance;
    $this->taille = $taille;
    $this->poids = $poids;
    $this->statut = $statut;
    $this->commentaire = $commentaire;
  }

  
}
?>
