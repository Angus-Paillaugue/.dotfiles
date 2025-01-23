<?php
session_start();
require_once __DIR__ . '/../../lib/components.php';
require_once __DIR__ . '/../../lib/jwt.php';
require_once __DIR__ . '/../../lib/cookies.php';
require_once __DIR__ . '/../../controleur/RecupererUneRencontre.php';
require_once __DIR__ . '/../../controleur/ListerTousLesJoueurs.php';
require_once __DIR__ . '/../../controleur/ModifierUneRencontre.php';
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ob_start();

$jwt = Cookies::getCookie('token');
$payload = null;

if ($jwt) {
  $payload = JWT::validateJWT($jwt);
  if (!$payload) {
    header('Location: log-in.php', true, 303);
  }
} else {
  header('Location: log-in.php', true, 303);
}
$title = 'Ajouter une rencontre';


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $rencontre = new RecupererUneRencontre($_GET['id']);
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
  header('Location: /dashboard/edit-rencontre.php?id=' . $rencontre->getId());
}
?>

<form method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']) .
  '?' .
  http_build_query(
    $_GET
  ); ?>" class="max-w-screen-xl w-full mx-auto p-4 rounded-xl border space-y-6 border-neutral-300/50">
  <h2>Ajouter une rencontre</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <?php
    Components::Input([
      'label' => 'Équipe adverse',
      'id' => 'nom',
      'value' => $rencontre->getEquipeAdverse(),
    ]);
    Components::Input([
      'label' => 'Date et heure',
      'id' => 'date_heure',
      'type' => 'datetime-local',
      'value' => $rencontre->getDateHeure(),
    ]);
    Components::Input([
      'label' => 'Lieu',
      'name' => 'lieu',
      'id' => 'lieu',
      'value' => $rencontre->getLieu(),
    ]);
    ?>
  </div>

  <div class="grid grid-cols-2 gap-4">
    <?php
    Components::Button([
      'label' => 'Annuler',
      'variant' => 'danger',
      'type' => 'button',
      'href' => '/dashboard/rencontre.php?id=' . $rencontre->getId(),
    ]);
    Components::Button([
      'label' => 'Enregistrer',
      'variant' => 'primary',
      'type' => 'submit',
    ]);
    ?>
  </div>
</form>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../layout.php';


?>
