<?php
require_once '../../lib/connector.php';

class JoueurDAO {
  private $conn;

  public function __construct() {
    $this->conn = sql_connector::getInstance('R3', 'localhost', 'school', "\$iutinfo");
  }
}
?>
