<?php
require_once '../modele/Contact.php';
require_once '../modele/ContactDAO.php';

class ObtenirTousLesContacts {

  public static function exec() {
    $conn = sql_connector::getInstance('section4', 'localhost', 'school', '\$iutinfo');
    $results = $conn->run_query('SELECT * FROM contact;');
    $contacts = array();
    foreach ($results as $row) {
      $contact = new Contact($row['nom'], $row['prenom'], $row['adresse'], $row['telephone'], $row['code_postal'], $row['ville']);
      $contact->setId($row['id']);
      $contacts[] = $contact;
    }
    return $contacts;
  }
}
?>
