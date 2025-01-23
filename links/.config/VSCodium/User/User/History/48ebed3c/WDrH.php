<!--
  Auteur: Angus Paillaugue
  Date: 05/09/2024
  Version: 1.1
  Description: Fichier de connexion à la base de données

  Exemple d'utilisation:

  require('lib/connector.php');

                           DB_NAME   HOSTNAME    USERNAME   PASSWORD
  $conn = new sql_connector("TP1", "localhost", "school", "\$iutinfo");

  $data = $conn->run_query("SELECT * FROM test WHERE id = '?';", 1);
  var_dump($data);
-->

<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

  class sql_connector {
    private $pdo;

    public function __construct($db_name, $server, $user, $password) {
      if($db_name == "" || $server == "" || $user == "" || $password == "") {
        echo "Error: Missing parameters";
        exit();
      }
      try {
        $connection_string = "mysql:host=$server;dbname=$db_name";
        $this->pdo = new PDO($connection_string, $user, $password);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      } catch (PDOException $e) {
        echo "Failed to connect to MySQL: " . $e->getMessage();
        exit();
      }
    }

    public function run_query($sql, ...$params)
    {
      try {
        // Ensure the number of placeholders matches the number of parameters
        if (substr_count($sql, '?') !== count($params)) {
            throw new InvalidArgumentException('Number of bound variables does not match number of tokens');
        }
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
      } catch (PDOException $e) {
        echo 'Query failed: ' . $e->getMessage();
        return false;
      }
    }

    public function __destruct() {
      $this->pdo = null;
    }
  }
?>
