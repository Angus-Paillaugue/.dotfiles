<?php
session_start();
require_once __DIR__ . '/../../lib/components.php';
require_once __DIR__ . '/../../lib/jwt.php';
require_once __DIR__ . '/../../lib/cookies.php';
require_once __DIR__ . '/../../controleur/RecupererUnJoueur.php';
require_once __DIR__ . '/../../controleur/RecupererStatistiquesJoueur.php';
require_once __DIR__ . '/../../lib/formatters.php';
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
$title = 'Joueur';

if (!isset($_GET['id'])) {
  throw new Exception('ID du joueur non fourni');
}

try {
  $joueur = (new RecupererUnJoueur($_GET['id']))->execute();

  $statistiques = (new RecupererStatistiquesJoueur($joueur))->execute();
} catch (Exception $e) {
  echo $e->getMessage();
  exit();
}

var_dump($statistiques['poste']);
?>

<div class="max-w-screen-xl w-full mx-auto p-4 rounded-xl border space-y-4 border-neutral-900">
  <div class="flex flex-row items-center justify-between">
    <h1>
      <?php echo $joueur->getNom() . ' ' . $joueur->getPrenom(); ?>
    </h1>
    <?php Components::Button([
      'label' => 'Modifier',
      'href' => '/dashboard/edit-joueur.php?id=' . $joueur->getId(),
    ]); ?>
  </div>
  <p class="text-neutral-400 text-base">
    Licence : <span class="font-semibold font-mono"><?php echo $joueur->getNumeroLicence(); ?></span>
  </p>
  <div class="flex flex-row gap-8 flex-wrap">
    <div class="flex flex-row gap-2 items-center px-4 py-2 border rounded-lg w-fit border-neutral-900">
      <span class="text-neutral-400"><?php echo Components::Icon([
        'icon' => 'birthday',
        'class' => 'size-5',
      ]); ?></span>
      <time><?php echo formatters::formatDate(
        $joueur->getDateNaissance()
      ); ?></time>
    </div>
    <div class="flex flex-row gap-2 items-center px-4 py-2 border rounded-lg w-fit border-neutral-900">
      <span class="text-neutral-400"><?php echo Components::Icon([
        'icon' => 'weight',
        'class' => 'size-5',
      ]); ?></span>
      <span><?php echo Formatters::formatWeight($joueur->getPoids()); ?></span>
    </div>
    <div class="flex flex-row gap-2 items-center px-4 py-2 border rounded-lg w-fit border-neutral-900">
      <span class="text-neutral-400"><?php echo Components::Icon([
        'icon' => 'status',
        'class' => 'size-5',
      ]); ?></span>
      <span><?php echo $joueur->getStatut(); ?></span>
    </div>
    <div class="flex flex-row gap-2 items-center px-4 py-2 border rounded-lg w-fit border-neutral-900">
      <span class="text-neutral-400"><?php echo Components::Icon([
        'icon' => 'poste',
        'class' => 'size-5',
      ]); ?></span>
      <span><?php echo $joueur->getStatut(); ?></span>
    </div>
  </div>
  <?php if (count($joueur->getCommentaires()) == 0) {
    echo "<p class='text-neutral-400'>Aucun commentaire,";
    Components::Link([
      'label' => 'en ajouter',
      'href' => '/dashboard/add-commentaire.php?id=' . $joueur->getId(),
    ]);
    echo '</p>';
  } else {
    echo '<div class="flex flex-row justify-between items-center"><h3>Commentaires</h3>';
    Components::Button([
      'label' => 'Ajouter un commentaire',
      'href' => '/dashboard/add-commentaire.php?id=' . $joueur->getId(),
      'class' => 'w-fit',
    ]);
    echo '</div>';
    foreach ($joueur->getCommentaires() as $commentaire) {
      echo "<div class='bg-neutral-900 p-4 rounded-lg border border-neutral-900 group/comment relative overflow-hidden'>";
      echo "<p class='text-base whitespace-pre-wrap'>" .
        $commentaire->getContenu() .
        '</p>';
      echo "<time class='text-sm text-neutral-400'>" .
        Formatters::formatDateTime($commentaire->getDate()) .
        '</time>';
      echo "<div class='opacity-0 transition-opacity group-hover/comment:opacity-100 bottom-0 absolute top-0 right-0 flex flex-col justify-between'>";
      Components::Button([
        'label' => 'Modifier',
        'href' => '/dashboard/edit-commentaire.php?id=' . $commentaire->getId(),
      ]);
      Components::Button([
        'label' => 'Supprimer',
        'variant' => 'danger',
        'href' =>
          '/dashboard/delete-commentaire.php?id=' .
          $commentaire->getId() .
          '&redirect=' .
          urlencode($_SERVER['REQUEST_URI']),
      ]);
      echo '</div>';
      echo '</div>';
    }
  } ?>
</div>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../layout.php';


?>
