<?php
session_start();
require_once __DIR__ . '/../../lib/components.php';
require_once __DIR__ . '/../../lib/jwt.php';
require_once __DIR__ . '/../../lib/cookies.php';
require_once __DIR__ . '/../../controleur/RecupererStatistiquesClub.php';
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
$title = 'Statistiques';

$statistiques = (new RecupererStatistiquesClub())->execute();
$clubStats = $statistiques['club'];
$playersStats = $statistiques['joueurs'];

?>


<div class="max-w-screen-xl w-full mx-auto p-4 rounded-xl border space-y-6 border-neutral-900">
  <h1>Statistiques</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="bg-neutral-900 transition-colors flex flex-row justify-between p-4 rounded-lg border border-neutral-900">
      <div class="flex flex-col">
        <h4>Matches</h4>
        <p class="text-sm font-medium text-neutral-400">Taux de victoire: <span class='text-neutral-100'><?php echo $clubStats['nbMatchGagnes']/$clubStats['nbMatchTotal'] * 100; ?>%</span></p>
        <div class="flex flex-col mt-4">
          <p class="text-neutral-400">Total</p>
          <p class="text-3xl font-bold font-mono"><?php echo $clubStats['nbMatchTotal']; ?></p>
        </div>
      </div>
      <div class="flex flex-col items-end justify-between">
        <div class="px-3 py-1 rounded bg-green-600 font-mono group flex flex-row">
          <span class="w-0 overflow-hidden group-hover:w-20 transition-all block">Victoire</span>
          <span><?php echo $clubStats['nbMatchGagnes']; ?></span>
        </div>
        <div class="px-3 py-1 rounded bg-red-600 font-mono group flex flex-row">
          <span class="w-0 overflow-hidden group-hover:w-20 transition-all block">Défaites</span>
          <span><?php echo $clubStats['nbMatchPerdus']; ?></span>
        </div>
        <div class="px-3 py-1 rounded bg-gray-600 font-mono group flex flex-row">
          <span class="w-0 overflow-hidden group-hover:w-20 transition-all block">Nul</span>
          <span><?php echo $clubStats['nbMatchNuls']; ?></span>
        </div>
      </div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <td>Joueur</td>
        <td>Meilleur poste</td>
        <td>Titularisations</td>
        <td>Remplacements</td>
        <td>Note</td>
        <td>% Victoire</td>
      </tr>
    </thead>

    <tbody>
      <?php foreach ($playersStats as $joueur): ?>
        <tr>
          <td><?php echo $joueur['nom'] . ' ' . $joueur['prenom']; ?></td>
          <td><?php echo $joueur['meilleurPoste']; ?></td>
          <td><?
            echo $joueur['titularisations'];
          ?></td>
          <td><?php echo $joueur['remplacements']; ?></td>
          <td><?php echo $joueur['note']; ?></td>
          <td><?php echo $joueur['victoire']; ?></td>
        </tr>
      <?php endforeach ?>
    </tbody>
  </table>
</div>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../layout.php';


?>
