<?php
require_once '../../lib/connector.php';

class JoueurDAO {
  private $conn;

  public function __construct() {
    $this->conn = sql_connector::getInstance();
  }

  public function get($user) {
    $username = $user->getId();
    $data = $this->conn->run_query('SELECT * FROM users WHERE username = ?;', $username);
    $data = $data[0];
  }

  public function insert($user) {
    $username = $user->getUsername();
    $password_hash = $user->getPasswordHash();
    $insertedRow = $this->conn->run_query(
      'INSERT INTO users (username, password_hash) VALUES (?, ?);',
      $username,
      $password_hash
    );
    return $insertedRow;
  }

  public function update($user) {
    $id = $user->getId();
    $username = $user->getUsername();
    $password_hash = $user->getPasswordHash();
    $this->conn->run_query(
      'UPDATE users SET username = ?, password_hash = ? WHERE id = ?;',
      $username,
      $password_hash,
      $id
    );
  }

  public function delete($user) {
    $id = $user->getId();
    $this->conn->run_query('DELETE FROM joueurs WHERE id = ?;', $id);
  }

  public function getAll() {
    return $this->conn->run_query('SELECT * FROM joueurs;');
  }

  public function search($nom) {
    return $this->conn->run_query('SELECT * FROM joueurs WHERE nom = ?;', $nom);
  }
}
?>
