/**
 * Class sql_connector
 *
 * A singleton class to manage MySQL database connections using PDO.
 *
 * @package school\lib
 *
 * @method static sql_connector getInstance(string $db_name, string $server, string $user, string $password) Get the singleton instance of the sql_connector class.
 * @method array|false run_query(string $sql, mixed ...$params) Execute a SQL query with optional parameters and return the result as an associative array.
 *
 * @property PDO $pdo The PDO instance for database connection.
 *
 * @throws InvalidArgumentException If the number of bound variables does not match the number of tokens in the SQL query.
 * @throws PDOException If there is an error connecting to the database or executing a query.
 * 
 * @example
 * $db = sql_connector::getInstance('database_name', 'localhost', 'username', 'password');
 * $result = $db->run_query('SELECT * FROM table WHERE id = ?', 1);
 *
 * @note This class cannot be cloned or unserialized to ensure the singleton pattern.
 */
<!-- <?php
class sql_connector
{
	private static $instance = null;
	private $pdo;

	private function __construct($db_name, $server, $user, $password)
	{
		if ($db_name == '' || $server == '' || $user == '' || $password == '') {
			echo 'Error: Missing parameters';
			exit();
		}
		try {
			$connection_string = "mysql:host=$server;dbname=$db_name";
			$this->pdo = new PDO($connection_string, $user, $password);
			$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		} catch (PDOException $e) {
			echo 'Failed to connect to MySQL: ' . $e->getMessage();
			exit();
		}
	}

	public static function getInstance($db_name, $server, $user, $password)
	{
		if (self::$instance === null) {
			self::$instance = new self($db_name, $server, $user, $password);
		}
		return self::$instance;
	}

	public function run_query($sql, ...$params)
	{
		try {
			// Ensure the number of placeholders matches the number of parameters
			if (substr_count($sql, '?') !== count($params)) {
				throw new InvalidArgumentException(
					'Number of bound variables does not match number of tokens'
				);
			}
			$stmt = $this->pdo->prepare($sql);
			$stmt->execute($params);

			return $stmt->fetchAll(PDO::FETCH_ASSOC);
		} catch (PDOException $e) {
			echo 'Query failed: ' . $e->getMessage();
			return false;
		}
	}

	private function __clone()
	{
		// Prevent cloning
	}

	private function __wakeup()
	{
		// Prevent unserializing
	}

	public function __destruct()
	{
		$this->pdo = null;
	}
}


?> -->
