<?php
require_once __DIR__ . '/../modele/JoueurDAO.php';

class RecupererStatistiques
{
  private $DAO;
  private $nbMatchGagnes;
  private $nbMatchPerdus;
  private $nbMatchNuls;

  public function __construct()
  {
    $this->DAO = new JoueurDAO();
  }

  public function execute()
  {
    // return $this->DAO->update($this->joueur);
  }
}
?>
