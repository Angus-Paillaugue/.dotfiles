<?php
require_once __DIR__ . '/../modele/Commentaire.php';
require_once __DIR__ . '/../modele/CommentaireDAO.php';

class SupprimerUnCommentaire
{
  private $DAO;
  private $commentaire;

  public function __construct($joueur)
  {
    $this->commentaire = $joueur;
    $this->DAO = new CommentaireDAO();
  }

  public function execute()
  {
    $this->DAO->delete($this->commentaire);
  }
}
?>
