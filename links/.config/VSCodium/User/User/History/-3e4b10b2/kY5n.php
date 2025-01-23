<?php
require_once __DIR__ . '/../modele/Joueur.php';
require_once __DIR__ . '/../modele/JoueurDAO.php';
require_once __DIR__ . '/../lib/error.php';

class SupprimerUnJoueur
{
  private $DAO;
  private $joueur;

  public function __construct($joueur)
  {
    $this->joueur = $joueur;
    $this->DAO = new JoueurDAO();
  }

  public function execute()
  {
    $this->DAO->delete($this->joueur);
  }
}

if (!isset($_GET['id'])) {
  ErrorHandling::setError('ID du joueur non fourni');
  exit();
}

try {
  $joueur = (new RecupererUnJoueur($_GET['id']))->execute();
  (new SupprimerUnJoueur($joueur))->execute();

  header('Location: /vue/dashboard/');
  exit();
} catch (Exception $e) {
  ErrorHandling::setFatalError($e->getMessage());
}
?>
