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

if($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = [
    'nom' => $_POST['nom'],
    'prenom' => $_POST['prenom'],
    'licence' => $_POST['licence'],
    'date_de_naissance' => $_POST['date_de_naissance'],
    'taille' => $_POST['taille'],
    'poids' => $_POST['poids'],
  ];

  $options = [
    'http' => [
      'method' => 'POST',
      'header' => 'Content-Type: application/json',
      'content' => json_encode($data),
    ],
  ];

  $url = 'http://localhost:3000/joueurs';
  $context = stream_context_create($options);
  $result = file_get_contents($url, false, $context);

  if ($result) {
    header('Location: joueurs.php', true, 303);
  } else {
    echo 'Erreur lors de la création du joueur';
  }
}
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
  echo "<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>";
  Components::Input([
    'id' => 'nom',
    'label' => 'Nom',
  ]);
  Components::Input([
    'id' => 'prenom',
    'label' => 'Prénom',
    'required' => true,
  ]);
  echo "</div>";

  echo "<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>";
  Components::Input([
    'id' => 'licence',
    'label' => 'Numéro de licence',
  ]);
  Components::Input([
    'id' => 'date_de_naissance',
    'label' => 'Date de naissance',
    'type' => 'date',
  ]);
  echo "</div>";

  echo "<div class='grid grid-cols-1 md:grid-cols-2 gap-4'>";
  Components::Input([
    'id' => 'taille',
    'label' => 'Taille',
    'type' => 'number',
  ]);
  Components::Input([
    'id' => 'poids',
    'label' => 'Poids',
    'type' => 'number',
  ]);
  echo "</div>";

  Components::Button([
    'label' => 'Ajouter',
    'type' => 'submit',
    'class' => 'ml-auto'
  ]);
  ?>
</form>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../layout.php';


?>
