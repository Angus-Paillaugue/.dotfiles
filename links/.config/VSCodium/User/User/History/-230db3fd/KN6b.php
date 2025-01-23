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
var_dump($rencontres);

function displayRencontres($r) {
  echo '<div class="row">';
  foreach ($r as $rencontre) {
    echo '<div class="col-md-4">';
    echo '<div class="card">';
    echo '<div class="card-body">';
    echo '<h5 class="card-title">'.$rencontre['equipe1'].' vs '.$rencontre['equipe2'].'</h5>';
    echo '<p class="card-text">'.$rencontre['date'].'</p>';
    echo '<a href="rencontre.php?id='.$rencontre['id'].'" class="btn btn-primary">Voir</a>';
    echo '</div>';
    echo '</div>';
    echo '</div>';
  }
  echo '</div>';
}

if ($next) {
  displayRencontres($rencontres['next']);
}else if ($previous) {
  displayRencontres($rencontres['previous']);
}else {
  displayRencontres($rencontres['next']);
  displayRencontres($rencontres['previous']);
}
?>

<?php
$content = ob_get_clean();
require_once __DIR__ .'/../layout.php';


?>
