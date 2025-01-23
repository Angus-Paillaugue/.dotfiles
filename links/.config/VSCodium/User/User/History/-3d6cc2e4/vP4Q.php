<?php
class ToutesLesRencontres {
  private $DAO;
  private $rencontres;

  public function __construct() {
    $this->DAO = new RencontreDAO();
  }

  public function execute() {
    $this->rencontres = $this->DAO->findAll();
  }

  public function getRencontres() {
    return $this->rencontres;
  }
}
?>
