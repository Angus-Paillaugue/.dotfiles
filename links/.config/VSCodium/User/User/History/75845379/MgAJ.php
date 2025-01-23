<?php
require_once __DIR__ . '/../modele/Rencontre.php';
require_once __DIR__ . '/../modele/RencontreDAO.php';

class CreerUnCommentaire
{
  private $id_joueur;
  private $contenu;
  private $DAO;

  public function __construct($date_heure, $equipe_adverse, $lieu, $resultat)
  {
    $this->id_joueur = $id_joueur;
    $this->contenu = $contenu;
    $this->DAO = new RencontreDAO();
  }

  public function execute()
  {
    $rencontre
    return $commentaire;
  }
}
?>
