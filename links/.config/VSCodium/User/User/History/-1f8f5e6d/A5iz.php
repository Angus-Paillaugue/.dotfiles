<?php
require_once '../modele/Contact.php';
require_once '../modele/ContactDAO.php';

class ObtenirTousLesContacts {

  public static function exec() {
    $DAO = new ContactDAO();
    $results = $DAO->selectAll();
    $contacts = array();
    foreach ($results as $row) {
      $contact = new Contact($row['nom'], $row['prenom'], $row['adresse'], $row['telephone'], $row['code_postal'], $row['ville']);
      $contact->setId($row['id']);
      $contacts[] = $contact;
      var_dump($contact.getNom());
    }
    return $contacts;
  }
}
?>
