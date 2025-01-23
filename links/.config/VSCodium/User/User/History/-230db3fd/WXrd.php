<?php
session_start();
require_once __DIR__ .'/../../lib/components.php';
require_once __DIR__ .'/../../lib/jwt.php';
require_once __DIR__ .'/../../lib/cookies.php';
require_once __DIR__ .'/../../controleur/ListerToutesLesRencontres.php';
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
$title = 'Rencontres';

$rencontres = (new ToutesLesRencontres(null))->execute();
$next = isset($_GET['next']) ?? false;
$previous = isset($_GET['previous']) ?? false;

function displayRencontres($label, $r) {
  echo "<h2>".$label."</h2>";
  echo "<div class='grid grid-cols-1 lg:grid-cols-2 gap-4'>";
  foreach ($r as $rencontre) {
  echo "
    <a href='/dashboard/rencontre.php?id=".$rencontre->getId()."' class='bg-neutral-50 transition-colors hover:bg-neutral-100 p-4 rounded-lg border border-neutral-300/50'>
      <div class='flex flex-row justify-between items-center'>
        <h4 class='text-2xl font-semibold'>".$rencontre->getEquipeAdverse()."</h4>
        <time class='text-base text-neutral-600 font-base'>".$rencontre->getDateHeure()."</time>
      </div>
      <p class='text-neutral-600 text-lg font-semibold'>".$rencontre->getLieu()."</p>
    </a>";
  }
  echo "</div>";
}
echo "<div class='max-w-screen-xl w-full mx-auto p-4 rounded-xl border space-y-4 border-neutral-300/50'>";
if ($next) {
  displayRencontres('Prochaine rencontres', $rencontres['next']);
}else if ($previous) {
  displayRencontres('Rencontres passés', $rencontres['previous']);
}else {
  displayRencontres('Prochaine rencontres', $rencontres['next']);
  displayRencontres('Rencontres passés', $rencontres['previous']);
}

echo "</div></div>";
?>

<?php
$content = ob_get_clean();
require_once __DIR__ .'/../layout.php';


?>
