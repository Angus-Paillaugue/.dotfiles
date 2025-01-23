<?php
require_once '../../../lib/connector.php';
class Annuaire {
  private $contacts;

  public function __construct() {
    $this->contacts = [];
  }

  public function ajouterContact($contact) {
    $this->contacts[] = $contact;
  }

  public function supprimerContact($contact) {
    $index = array_search($contact, $this->contacts);
    if ($index !== false) {
      unset($this->contacts[$index]);
    }
  }

  public function getContacts() {
    return $this->contacts;
  }

  public function __toString() {
    $result = '';
    foreach ($this->contacts as $contact) {
      $result .= $contact . "\n";
    }
    return $result;
  }

  public function ModifierLidentiteDunContact($contact, $nom, $prenom) {
    $contact->setNom($nom);
    $contact->setPrenom($prenom);
  }
}

class Contact {
  private $id;
  private $nom;
  private $prenom;
  private $adresse;
  private $telephone;
  private $codePostal;
  private $ville;

  public function __construct($nom, $prenom, $adresse, $telephone, $codePostal, $ville) {
    $this->nom = $nom;
    $this->prenom = $prenom;
    $this->adresse = $adresse;
    $this->telephone = $telephone;
    $this->codePostal = $codePostal;
    $this->ville = $ville;
    $conn = sql_connector::getInstance('section4', 'localhost', 'school', '\$iutinfo');
    $insertedRow = $conn->run_query('INSERT INTO contacts (nom, prenom, adresse, telephone, codePostal, ville) VALUES (?, ?, ?, ?, ?, ?);', $nom, $prenom, $adresse, $telephone, $codePostal, $ville);
    $this->id = $insertedRow['id'];
  }

  public function getNom() {
    return $this->nom;
  }

  public function getPrenom() {
    return $this->prenom;
  }

  public function getAdresse() {
    return $this->adresse;
  }

  public function getTelephone() {
    return $this->telephone;
  }

  public function getCodePostal() {
    return $this->codePostal;
  }

  public function getVille() {
    return $this->ville;
  }

  public function setNom($nom) {
    $this->nom = $nom;
  }

  public function setPrenom($prenom) {
    $this->prenom = $prenom;
  }

  public function setAdresse($adresse) {
    $this->adresse = $adresse;
  }

  public function setTelephone($telephone) {
    $this->telephone = $telephone;
  }

  public function setCodePostal($codePostal) {
    $this->codePostal = $codePostal;
  }

  public function setVille($ville) {
    $this->ville = $ville;
  }

  public function __toString() {
    return $this->prenom . ' ' . $this->nom . ' ' . $this->adresse . ' ' . $this->codePostal . ' ' . $this->ville . ' ' . $this->telephone;
  }


}
?>
