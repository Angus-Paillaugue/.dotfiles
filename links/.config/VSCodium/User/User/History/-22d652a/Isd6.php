<?php
session_start();
require_once __DIR__ . '/../../lib/components.php';
require_once __DIR__ . '/../../lib/jwt.php';
require_once __DIR__ . '/../../lib/cookies.php';
require_once __DIR__ . '/../../lib/formatters.php';
require_once __DIR__ . '/../../controleur/ListerToutesLesRencontres.php';
require_once __DIR__ . '/../../controleur/ListerTousLesJoueurs.php';
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
$title = 'Dashboard ' . $payload['username'];

$rencontres = (new ToutesLesRencontres(4))->execute();
$joueurs = (new ListerTousLesJoueurs())->execute();
?>


<div class="max-w-screen-xl w-full mx-auto p-4 rounded-xl border space-y-6 border-primary-100">
	<h1>Bienvenue <?php echo $payload['username']; ?></h1>
  <?php
  echo "<div class='grid grid-cols-2 gap-8'><div class='flex flex-row items-start justify-start gap-4 flex-wrap'>";
  Components::Button([
    'label' => 'Ajouter une rencontre',
    'variant' => 'primary',
    'href' => '/dashboard/add-rencontre.php',
    'icon' => 'plus',
  ]);
  Components::Button([
    'label' => 'Ajouter un joueur',
    'variant' => 'primary',
    'href' => '/dashboard/add-joueur.php',
    'icon' => 'plus',
  ]);
  Components::Button([
    'label' => 'Statistiques',
    'variant' => 'primary',
    'href' => '/dashboard/statistiques.php',
    'icon' => 'chart',
  ]);
  echo '</div>';

  // Liste des joueurs
  echo "<div><h2>Joueurs</h2><div class='!m-0 max-h-[300px] overflow-y-auto'><table class='w-full table-auto text-sm rounded-lg overflow-hidden'><thead class='border-b sticky top-0 border-primary-100 bg-primary-50'><tr><td scope='  col' class='sticky top-0 h-12 px-4 text-left align-middle font-medium text-neutral-600'>Nom</td><td scope=' col' class='sticky top-0 h-12 px-4 text-left align-middle font-medium text-neutral-600'>Prénom</td></tr></thead><tbody class='[&amp;_tr:last-child]:border-0'>";
  foreach ($joueurs as $joueur) {
    echo "<tr class='border-b border-border transition-colors even:bg-primary-50'><td class='px-4 align-middle'><a class='hover:underline' href='/dashboard/joueur.php?id=" . $joueur->getId() . "'>" .
      $joueur->getNom() .
      "</a></td><td class='px-4 align-middle'>" .
      $joueur->getPrenom() .
      '</td></tr>';
  }
  echo "</tbody></table></div></div></div>";

  // Rencontres à venir
  if (count($rencontres['next']) > 0) {
    echo "<div class='flex flex-row items-center justify-between'><h2>Rencontres à venir</h2>";
    Components::Button([
      'label' => 'Voir tout',
      'variant' => 'primary',
      'href' => '/dashboard/rencontres.php?next',
      'icon' => 'plus',
    ]);
    echo "</div><div class='grid grid-cols-1 lg:grid-cols-2 gap-4'>";
    foreach ($rencontres['next'] as $rencontre) {
      echo "
      <a href='/dashboard/rencontre.php?id=" .
        $rencontre->getId() .
        "' class='bg-primary-50 transition-colors hover:bg-primary-100 p-4 rounded-lg border border-primary-100'>
        <div class='flex flex-row justify-between items-center'>
          <h4 class='text-2xl font-semibold'>" .
        $rencontre->getEquipeAdverse() .
        "</h4>
          <time class='text-base text-neutral-600 font-base'>" .
        Formatters::formatDateTime($rencontre->getDateHeure()) .
        "</time>
        </div>
        <p class='text-neutral-600 text-lg font-semibold'>" .
        $rencontre->getLieu() .
        "</p>
      </a>";
    }
    echo '</div>';
  }

  // Rencontres passées
  if (count($rencontres['previous']) > 0) {
    echo "<div class='flex flex-row items-center justify-between'><h2>Rencontres passées</h2>";
    Components::Button([
      'label' => 'Voir tout',
      'variant' => 'primary',
      'href' => '/dashboard/rencontres.php?previous',
      'icon' => 'plus',
    ]);
    echo "</div><div class='grid grid-cols-1 lg:grid-cols-2 gap-4'>";
    foreach ($rencontres['previous'] as $rencontre) {
      $pillBg =
        $rencontre->getResultat() === 'Nul'
          ? 'bg-neutral-600'
          : ($rencontre->getResultat() == 'Victoire'
            ? 'bg-green-600'
            : 'bg-red-600');
      $pill = $rencontre->getResultat()
        ? "<div class='px-2 py-1 text-base rounded-full text-primary-100 " .
          $pillBg .
          "'>" .
          $rencontre->getResultat() .
          '</div>'
        : '';
      echo "
      <a href='/dashboard/rencontre.php?id=" .
        $rencontre->getId() .
        "' class='bg-primary-50 transition-colors hover:bg-primary-100 p-4 rounded-lg border border-primary-100'>
        <div class='flex flex-row justify-between items-center'>
          <h4 class='text-2xl font-semibold'>" .
        $rencontre->getEquipeAdverse() .
        "</h4>
          <time class='text-base text-primary-600 font-base'>" .
        Formatters::formatDateTime($rencontre->getDateHeure()) .
        "</time>
        </div>
        <div class='flex flex-row items-end justify-between'>
          <p class='text-primary-600 text-lg font-semibold'>" .
        $rencontre->getLieu() .
        "</p>
          $pill
        </div>
      </a>";
    }
    echo '</div>';
  }
  ?>
</div>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../layout.php';


?>
