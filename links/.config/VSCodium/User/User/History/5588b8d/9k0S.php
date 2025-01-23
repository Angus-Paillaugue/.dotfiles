<?php
require_once '../../../lib/connector.php';
class ContactDAO {
  private $conn;

  public function __construct() {
    $this->conn = sql_connector::getInstance('section4', 'localhost', 'school', '\$iutinfo');
  }

  public function 
}
?>
