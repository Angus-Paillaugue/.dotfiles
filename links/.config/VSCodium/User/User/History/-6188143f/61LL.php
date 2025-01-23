
<?php
session_start();
include '../lib/connector.php';
include '../lib/jwt.php';
include '../lib/cookies.php';
require_once '../lib/components.php';
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$title = 'Log-in';

ob_start();

$conn = sql_connector::getInstance('auth_test', 'localhost', 'school', "\$iutinfo");
$loc = htmlspecialchars($_SERVER['PHP_SELF']) . '?' . http_build_query($_GET);
$error = $_SESSION['error'] ?? null;
unset($_SESSION['error']);

// Form submission handling
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$username = $_POST['username'];
	$password = $_POST['password'];
	if (!isset($username) || !isset($password)) {
		$_SESSION['error'] = 'Veuillez remplir tous les champs';
	} else {
		$username = htmlspecialchars($username);
		$password = htmlspecialchars($password);
		$user = $conn->run_query('SELECT * FROM users WHERE username=?;', $username);
		if (count($user) == 0) {
			$_SESSION['error'] = "Cet utilisateur n'existe pas";
		} else {
			$user = $user[0];
			if (password_verify($password, $user['password_hash'])) {
				$payload = [
					'id' => $user['id'],
					'username' => $user['username'],
					'exp' => time() + 60 * 60 * 24, // Token expiration set to 1 day
				];
				$jwt = JWT::generateJWT($payload);

				Cookies::setCookie('token', $jwt, time() + 60 * 60 * 24);
			} else {
				$_SESSION['error'] = 'Mot de passe incorrect';
			}
		}
	}
	header("Location: $loc", true, 303);
}
?>

<div class="max-w-xl mx-auto w-full p-4 prose">
	<form action="<?php echo htmlspecialchars(
		$_SERVER['PHP_SELF']
	); ?>" method="post" class="p-4 border space-y-4 flex flex-col rounded-xl w-full bg-white">
		<h2 class="m-0">Se connecter</h2>
		<?php
		// Form building
		Components::Input([
			'id' => 'username',
			'label' => 'Nom d\'utilisateur',
			'placeholder' => "Votre nom d'utilisateur",
		]);
		Components::Input([
			'id' => 'password',
			'label' => 'Mot de passe',
			'placeholder' => 'Votre mot de passe',
			'type' => 'password',
		]);

		if ($error) {
			Components::Alert(['text' => $error, 'variant' => 'danger']);
		}

		Components::Button([
			'label' => 'Envoyer',
			'variant' => 'primary',
		]);
		Components::Link([
			'label' => 'Créer un compte',
			'href' => '/school/auth/sign-up.php',
		]);
		?>
	</form>

	<?php
		if(isset($_COOKIE['token'])) {
			$token = $_COOKIE['token'];
			$payload = JWT::validateJWT($token);
			if($payload) {
				Components::Link([
					'label' => 'Page restreinte',
					'href' => '/school/auth/restricted.php',
					'class' => 'mt-4 w-full text-center'
				]);
			}
		}
	?>
</div>

<?php
$content = ob_get_clean();
require_once('./layout.php')
?>
