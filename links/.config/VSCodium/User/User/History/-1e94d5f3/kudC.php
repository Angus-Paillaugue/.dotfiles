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
$title = 'Modifier une rencontre';

if (!isset($_GET['id'])) {
  throw new Exception('ID de la rencontre non fourni');
}

$rencontre = new RecupererUneRencontre($_GET['id']);
$rencontre = $rencontre->execute();
if($_SERVER['REQUEST_METHOD'] == 'POST') {
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
      $_POST['poste_' . $i],
      $_POST['role_debut_' . $i],
      $_POST['role_fin_' . $i],
      intval($_POST['evaluation_' . $i])
    );
    if($_POST['id_feuille_' . $i]) {
      $feuille->setId($_POST['id_feuille_' . $i]);
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

<form method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']) . '?' . http_build_query($_GET) ?>" class="max-w-screen-xl w-full mx-auto p-4 rounded-xl border space-y-6 border-neutral-300/50">
  <h2>Modifier une rencontre</h2>

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
    Components::Select([
      'label' => 'Résultat',
      'id' => 'resultat',
      'options' => [
        'victoire' => 'Victoire',
        'defaite' => 'Défaite',
        'nul' => 'Nul',
      ],
      'value' => $rencontre->getResultat(),
    ]);
    ?>
    <h3 class="col-span-2">Feuilles de match</h3>
    <?php
      $allPlayers = (new ListerTousLesJoueurs())->execute();
      for ($i = 0; $i < 16; $i++) {
        $feuille = $rencontre->getFeuilleMatch() ? $rencontre->getFeuilleMatch()[$i] : null;
        echo "<div class='p-4 rounded-lg border gap-4 border-neutral-300/50 grid grid-cols-2'>";

        // Id feuille
        var_dump($feuille);
        if($feuille)
        echo "<input type='hidden' id='id_feuille_" . $i . "' value='" . $feuille->getId() . "' class='hidden invisible'>";

        // Joueur
        Components::Select([
          'label' => 'Joueur',
          'id' => 'joueur_' . $i,
          'options' => array_reduce(
            $allPlayers,
            function ($acc, $joueur) {
              $acc[$joueur->getId()] = [
                'text' => $joueur->getPrenom() . ' ' . $joueur->getNom(),
                'value' => $joueur->getId(),
              ];
              return $acc;
            },
            []
          ),
          'value' => $feuille ? $feuille->getIdJoueur() : null,
        ]);

        // Poste
        Components::Input([
          'label' => 'Poste',
          'id' => 'poste_' . $i,
          'value' => $feuille ? $feuille->getPoste() : null,
        ]);

        // Rôle
        echo "<div class='block'><p class='text-neutral-600 font-medium text-base mb-1 block'>Rôle</p>";
        echo "<div class='flex items-center'>";
        Components::Select([
          'id' => 'role_debut_' . $i,
          'options' => [
            'titulaire' => 'Titulaire',
            'remplacant' => 'Remplaçant',
          ],
          'value' => $feuille ? $feuille->getRoleDebut() : null,
        ]);
        echo Components::Icon([
          'icon' => 'arrowRight',
          'class' => 'shrink-0 size-5 text-neutral-600',
        ]);
        Components::Select([
          'id' => 'role_fin_' . $i,
          'options' => [
            'titulaire' => 'Titulaire',
            'remplacant' => 'Remplaçant',
          ],
          'value' => $feuille ? $feuille->getRoleFin() : null,
        ]);
        echo '</div>';
        echo '</div>';

        // Évaluation
        echo "<div class='block'><p class='text-neutral-600 font-medium text-base mb-1 block'>Évaluation</p>";
        echo "<div class='flex items-center'>";
        Components::Select([
          'id' => 'evaluation_' . $i,
          'options' => [
            '1' => '1',
            '2' => '2',
            '3' => '3',
            '4' => '4',
            '5' => '5',
          ],
          'value' => $feuille ? $feuille->getEvaluation() : null,
        ]);
        echo '</div>';
        echo '</div>';

        echo '</div>';
      }
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
