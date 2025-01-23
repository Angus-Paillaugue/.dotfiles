<?php
require_once '../modele/User.php';

class UtilisateurExiste {
  private $username;
  private $DAO;

  public function __construct($username) {
    $this->username = $username;
    $this->DAO = new UserDAO();
  }

  public function exec() {
    $user = $this->DAO->search($this->username);
    return $user;
  }
}
?>
