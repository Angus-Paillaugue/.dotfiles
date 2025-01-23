<?php
class ModifierLesCoordonneesDunContact {
  private $conn;

  public function __construct() {
    $this->conn = sql_connector::getInstance('section4', 'localhost', 'school', '\$iutinfo');
  }
}
?>
