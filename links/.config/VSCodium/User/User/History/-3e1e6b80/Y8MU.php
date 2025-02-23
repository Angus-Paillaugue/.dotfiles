<?php
require_once '../../lib/connector.php';

class UserDAO {
  private $conn;

  public function __construct() {
    $this->conn = sql_connector::getInstance();
  }

  public function get($user) {
    $username = $user->getId();
    $data = $this->conn->run_query('SELECT * FROM user WHERE username = ?;', $username);
    $data = $data[0];
    $user = new User($data['username'], $data['password_hash']);

    return $user;
  }

  public function insert($user) {
    $username = $user->getUsername();
    $password_hash = $user->getPasswordHash();
    $insertedRow = $this->conn->run_query(
      'INSERT INTO user (username, password_hash) VALUES (?, ?);',
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
      'UPDATE user SET username = ?, password_hash = ? WHERE id = ?;',
      $username,
      $password_hash,
      $id
    );
  }

  public function delete($user) {
    $id = $user->getId();
    $this->conn->run_query('DELETE FROM user WHERE id = ?;', $id);
  }

  public function getAll() {
    return $this->conn->run_query('SELECT * FROM user;');
  }

  public function search($username) {
    return $this->conn->run_query('SELECT * FROM user WHERE username = ?;', $username);
  }
}
?>
