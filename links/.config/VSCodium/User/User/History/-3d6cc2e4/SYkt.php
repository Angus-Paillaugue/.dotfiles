<?php
require_once '../modele/RencontreDAO.php';

class ToutesLesRencontres {
  private $DAO;

  public function __construct() {
    $this->DAO = new RencontreDAO();
  }

  public function execute() {
   return $this->DAO->getAll();
  }
}
?>
