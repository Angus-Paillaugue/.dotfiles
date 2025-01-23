<?php
require_once '../modele/Contact.php';
require_once '../modele/ContactDAO.php';

class RechercherUnContact {
  private $DAO;
  private $nom;

  public function __construct($nom) {
    $this->nom = $nom;
    $this->DAO = new ContactDAO();
  }

  public function exec() {
    $contacts = [];
    $result = $this->DAO->search($this->nom);
    foreach ($result as $row) {
      $contact = new Contact($row['nom'], $row['prenom'], $row['adresse'], $row['telephone'], $row['code_postal'], $row['ville']);
      $contact->setId($row['id']);
      $contacts[] = $contact;
    }
    return $contacts;
  }
}
?>
