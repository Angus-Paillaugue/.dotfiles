<?php
require_once __DIR__ . '/../modele/Rencontre.php';
require_once __DIR__ . '/../modele/RencontreDAO.php';

class CreerUnCommentaire
{
  private $id_joueur;
  private $contenu;
  private $DAO;

  public function __construct($id_joueur, $contenu)
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
