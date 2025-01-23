<?php
require_once __DIR__ . '/../modele/JoueurDAO.php';

class RecupererStatistiquesJoueur
{
  private $DAO;

  public function __construct()
  {
    $this->DAO = new JoueurDAO();
  }

  public function execute()
  {
    $row = $this->DAO->getStatistics();

    return $row;
  }
}
?>
