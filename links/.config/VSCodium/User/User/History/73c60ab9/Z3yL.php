<?php
require_once '../../lib/connector.php';

class JoueurDAO {
  private $conn;

  public function __construct() {
    $this->conn = sql_connector::getInstance('R301_projet', 'localhost', 'R301_projet', "R301_projet");
  }
}
?>
