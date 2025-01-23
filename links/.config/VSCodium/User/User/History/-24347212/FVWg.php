<?php
session_start();
require_once __DIR__ . '/../../lib/components.php';
require_once __DIR__ . '/../../lib/jwt.php';
require_once __DIR__ . '/../../lib/cookies.php';
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
$title = 'Ajouter un joueur';

?>

<form method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']) .
  '?' .
  http_build_query(
    $_GET
  ); ?>" class="max-w-screen-xl w-full mx-auto p-4 rounded-xl border space-y-4 border-neutral-300/50">
  <h1>
    Ajouter un joueur
  </h1>
  <?php
  Components::Input([
    'name' => 'nom',
    'label' => 'Nom',
  ]);
  Components::Input([
    'name' => 'prenom',
    'label' => 'Prénom',
    'required' => true,
  ]);
  Components::Input([
    'name' => 'licence',
    'label' => 'Numéro de licence',
  ]);

  Components::Input([
    'name' => 'date_de_naissance',
    'label' => 'Date de naissance',
    'type' => 'date',
  ]);

  Components::Input([
    'name' => 'taille',
    'label' => 'Taille',
    'type' => 'number',
  ]);

  Components::Input([
    'name' => 'poids',
    'label' => 'Poids',
    'type' => 'number',
  ]);
  ?>
</form>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../layout.php';


?>
