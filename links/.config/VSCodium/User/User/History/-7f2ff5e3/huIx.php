<?php
require_once __DIR__ . '/../modele/RencontreDAO.php';
require_once __DIR__ . '/../modele/FeuilleMatch.php';
require_once __DIR__ . '/../lib/error.php';


class ModifierUneRencontre
{
  private $DAO;
  private $rencontre;

  public function __construct($rencontre)
  {
    $this->rencontre = $rencontre;
    $this->DAO = new RencontreDAO();
  }

  public function execute()
  {
    return $this->DAO->update($this->rencontre);
  }
}


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  if (!isset($_POST['id'])) {
    ErrorHandling::setFatalError('ID de la rencontre non fourni');
  }

  try {
    $rencontre = (new RecupererUneRencontre($_POST['id']))->execute();
  } catch (Exception $e) {
    ErrorHandling::setFatalError($e->getMessage());
  }

  if(!isset($_POST['nom']) || !isset($_POST['date_heure']) || !isset($_POST['lieu']) || !isset($_POST['resultat'])) {
    ErrorHandling::setError('Tous les champs sont obligatoires');
    exit(header('Location: /vue/dashboard/edit-rencontre.php?id=' . $_POST['id']));
  }

  $rencontre = new RecupererUneRencontre($_POST['id']);
  $rencontre = $rencontre->execute();
  $rencontre->setEquipeAdverse($_POST['nom']);
  $rencontre->setDateHeure($_POST['date_heure']);
  $rencontre->setLieu($_POST['lieu']);
  $rencontre->setResultat($_POST['resultat']);
  $rencontre->setFeuilleMatch([]);
  for ($i = 0; $i < 16; $i++) {
    $feuille = new FeuilleMatch(
      $rencontre->getId(),
      intval($_POST['joueur_' . $i]),
      $_POST['role_debut_' . $i],
      $_POST['role_fin_' . $i],
      $_POST['poste_' . $i],
      intval($_POST['evaluation_' . $i])
    );
    if ($_POST['id_feuille_' . $i]) {
      $feuille->setId(intval($_POST['id_feuille_' . $i]));
    }
    $feuilles = $rencontre->getFeuilleMatch();
    $feuilles[] = $feuille;
    $rencontre->setFeuilleMatch($feuilles);
  }
  $update = new ModifierUneRencontre($rencontre);
  $update->execute();
  header('Location: /vue/dashboard/rencontre.php?id=' . $rencontre->getId());
}
?>
