<?php
require_once __DIR__ . '/../modele/RencontreDAO.php';

class RecupererStatistiquesClub
{
  private $DAO;
  private $joueur;

  public function __construct($joueur)
  {
    $this->DAO = new RencontreDAO();
  }

  public function execute()
  {
    $row = $this->DAO->getStatistics($this->joueur);

    return [
      'nbMatchGagnes' => $row['nbMatchGagnes'],
      'nbMatchPerdus' => $row['nbMatchPerdus'],
      'nbMatchNuls' => $row['nbMatchNuls'],
      'nbMatchTotal' => $row['nbMatchTotal'],
    ];
  }
}
?>
