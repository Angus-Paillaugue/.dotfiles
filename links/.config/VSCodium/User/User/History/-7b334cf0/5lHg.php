<?php
require_once __DIR__ . '/../modele/Commentaire.php';
require_once __DIR__ . '/../modele/CommentaireDAO.php';
require_once __DIR__ . '/RecupererUnJoueur.php';

class CreerUnCommentaire
{
  private $id_joueur;
  private $contenu;
  private $DAO;

  public function __construct($id_joueur, $contenu)
  {
    $this->id_joueur = $id_joueur;
    $this->contenu = $contenu;
    $this->DAO = new CommentaireDAO();
  }

  public function execute()
  {
    $commentaire = new Commentaire($this->id_joueur, $this->contenu);
    $insertedRow = $this->DAO->insert($commentaire);
    $commentaire->setId($insertedRow['id']);
    return $commentaire;
  }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  try {
    var_dump($_POST);
    $joueur = new RecupererUnJoueur($_POST['id']);
    $joueur = $joueur->execute();
  } catch (Exception $e) {
    ErrorHandling::setFatalError($e->getMessage());
  }
  $commentaire = $_POST['commentaire'];
  $ajoutCommentaire = new CreerUnCommentaire($joueur->getId(), $commentaire);
  $ajoutCommentaire->execute();
  header('Location: /vue/dashboard/joueur.php?id=' . $joueur->getId(), true, 303);
}
?>
