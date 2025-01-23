<?php
require_once __DIR__ .'/../modele/JoueurDAO.php';

class ToutesLesRencontres {
  private $DAO;

  public function __construct() {
    $this->DAO = new JoueurDAO();
  }

  public function execute() {
   return $this->DAO->getAll();
  }
}
?>
