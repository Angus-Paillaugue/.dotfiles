<!--
  Auteur: Angus Paillaugue
  Date: 05/09/2024
  Version: 1.1
  Description: Fichier de connexion à la base de données

  Exemple d'utilisation:

  require('lib/connector.php');

                           DB_NAME   HOSTNAME    USERNAME   PASSWORD
  $conn = new sql_connector("TP1", "localhost", "school", "\$iutinfo");

  $data = $conn->run_query("SELECT * FROM test;");
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

    public function run_query($sql, $type = PDO::FETCH_ASSOC)
    {
      $stmt = $this->pdo->query($sql);
      $data = $stmt->fetchAll($type);
      $stmt->closeCursor();
      return $data;
    }

    public function __destruct() {
      $this->pdo = null;
    }
  }
?>
