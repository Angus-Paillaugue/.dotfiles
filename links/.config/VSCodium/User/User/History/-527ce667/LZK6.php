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
  private $nom;
  private $prenom;
  private $adresse;
  private $telephone;
  private $codePostal;
  private $ville;
  private $conn;

  public function __construct($nom, $prenom, $adresse, $telephone, $codePostal, $ville) {
    $this->nom = $nom;
    $this->prenom = $prenom;
    $this->adresse = $adresse;
    $this->telephone = $telephone;
    $this->codePostal = $codePostal;
    $this->ville = $ville;
  }

  public function getNom() {
    return $this->nom;
  }

  public function getPrenom() {
    return $this->prenom;
    $this->conn->run_query('UPDATE contact SET prenom=? WHERE id=?;', $prenom, $this->id);
  }

  public function getAdresse() {
    return $this->adresse;
    $this->conn->run_query('UPDATE contact SET adresse=? WHERE id=?;', $adresse, $this->id);
  }

  public function getTelephone() {
    return $this->telephone;
    $this->conn->run_query('UPDATE contact SET telephone=? WHERE id=?;', $telephone, $this->id);
  }

  public function getCodePostal() {
    return $this->codePostal;
    $this->conn->run_query('UPDATE contact SET codePostal=? WHERE id=?;', $codePostal, $this->id);
  }

  public function getVille() {
    return $this->ville;
    $this->conn->run_query('UPDATE contact SET ville=? WHERE id=?;', $ville, $this->id);
  }

  public function setNom($nom) {
    $this->nom = $nom;
    $this->conn->run_query('UPDATE contact SET nom=? WHERE id=?;', $nom, $this->id);
  }

  public function setPrenom($prenom) {
    $this->prenom = $prenom;
    $this->conn->run_query('UPDATE contact SET prenom=? WHERE id=?;', $prenom, $this->id);
  }

  public function setAdresse($adresse) {
    $this->adresse = $adresse;
    $this->conn->run_query('UPDATE contact SET adresse=? WHERE id=?;', $adresse, $this->id);
  }

  public function setTelephone($telephone) {
    $this->telephone = $telephone;
    $this->conn->run_query('UPDATE contact SET telephone=? WHERE id=?;', $telephone, $this->id);
  }

  public function setCodePostal($codePostal) {
    $this->codePostal = $codePostal;
    $this->conn->run_query('UPDATE contacts SET codePostal=? WHERE id=?;', $codePostal, $this->id);
  }

  public function setVille($ville) {
    $this->ville = $ville;
    $this->conn->run_query('UPDATE contacts SET ville=? WHERE id=?;', $ville, $this->id);
  }

  public function __toString() {
    return $this->prenom . ' ' . $this->nom . ' ' . $this->adresse . ' ' . $this->codePostal . ' ' . $this->ville . ' ' . $this->telephone;
  }


}
?>
