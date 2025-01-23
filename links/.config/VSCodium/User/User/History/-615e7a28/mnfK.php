<?php
require_once '../modele/Contact.php';
require_once '../modele/ContactDAO.php';

class SupprimerUnContact {

  private $conn;
  private $id;

  public function __construct($id) {
    $this->id = $id;
    $this->conn = sql_connector::getInstance('section4', 'localhost', 'school', '\$iutinfo');
  }

  public function exec() {
    $this->conn->run_query('DELETE FROM contact WHERE id = ?;', $this->id);
  }
}
?>
