<?php
require_once '../modele/Contact.php';
require_once '../modele/ContactDAO.php';

class SupprimerUnContact {
  private $DAO;
  private $contact;

  public function __construct($contact) {
    $this->contact = $contact;
    $this->DAO = new ContactDAO();
  }

  public function exec() {
    $this->DAO->delete($this->contact);
  }
}
?>
