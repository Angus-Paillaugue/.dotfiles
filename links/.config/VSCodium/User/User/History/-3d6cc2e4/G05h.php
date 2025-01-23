<?php
require_once __DIR__ .'/../modele/RencontreDAO.php';

class ToutesLesRencontres {
  private $DAO;

  public function __construct() {
    $this->DAO = new RencontreDAO();
  }

  public function execute($limit) {
    if(isset($limit)) {
      return array(
        'previous' => $this->DAO->getPrevious($limit),
        'next' => $this->DAO->getNext($limit)
      );
    }
    return array(
      'previous' => $this->DAO->getPrevious(null),
      'next' => $this->DAO->getNext(null)
    );
  }
}
?>
