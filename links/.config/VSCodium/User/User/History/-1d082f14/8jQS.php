<?php
require_once __DIR__ . '/../modele/CommentaireDAO.php';

class ModifierUnCommentaire
{
  private $commentaire;
  private $DAO;

  public function __construct($commentaire)
  {
    $this->DAO = new CommentaireDAO();
    $this->commentaire = $commentaire;
  }

  public function execute()
  {
    return $this->DAO->update($this->commentaire);
  }
}

require_once __DIR__ . '/../../lib/components.php';
require_once __DIR__ . '/../../lib/jwt.php';
require_once __DIR__ . '/../../lib/cookies.php';
require_once __DIR__ . '/../../lib/error.php';
require_once __DIR__ . '/../../controleur/RecupererUnCommentaire.php';
require_once __DIR__ . '/../../controleur/ModifierUnCommentaire.php';
require_once __DIR__ . '/../../controleur/RecupererUnJoueur.php';
require_once __DIR__ . '/../../modele/Commentaire.php';
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ob_start();

$title = 'Modifier un commentaire';

if (!isset($_GET['id'])) {
  ErrorHandling::setFatalError('ID du commentaire non fourni');
}

try {
  $commentaire = (new RecupererUnCommentaire($_GET['id']))->execute();
} catch (Exception $e) {
  ErrorHandling::setFatalError($e->getMessage());
}

$joueur = new RecupererUnJoueur($commentaire->getIdJoueur());
$joueur = $joueur->execute();

// Si le formulaire est soumis
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $commentaire = new Commentaire($joueur->getId(), $_POST['commentaire']);
  $commentaire->setId($_GET['id']);
  (new ModifierUnCommentaire($commentaire))->execute();
  header('Location: joueur.php?id=' . $joueur->getId(), true, 303);
}
?>
