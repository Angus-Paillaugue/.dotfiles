<?php
require_once __DIR__ . '/../modele/RencontreDAO.php';

class RecupererStatistiques
{
  private $DAO;

  public function __construct()
  {
    $this->DAO = new RencontreDAO();
  }

  public function execute()
  {
    $row = $this->DAO->getStatistics();

    return [
      'nbMatchGagnes' => $row['nbMatchGagnes'],
      'nbMatchPerdus' => $row['nbMatchPerdus'],
      'nbMatchNuls' => $row['nbMatchNuls'],
      'nbMatchTotal' => $row['nbMatchTotal'],
    ];
  }
}
?>
