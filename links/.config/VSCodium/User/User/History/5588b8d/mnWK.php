<?php
require_once '../../../lib/connector.php';
class ContactDAO {
  private $conn;

  public function __construct() {
    $this->conn = sql_connector::getInstance('section4', 'localhost', 'school', '\$iutinfo');
  }

  public function select($contact) {
    $id = $contact->getId();
    $data = $this->conn->run_query('SELECT * FROM contact WHERE id = ?;', $id);
    $data = $data[0];
  }

  public function insert($contact) {
    $nom = $contact->getNom();
    $prenom = $contact->getPrenom();
    $adresse = $contact->getAdresse();
    $telephone = $contact->getTelephone();
    $codePostal = $contact->getCodePostal();
    $ville = $contact->getVille();
    $insertedRow = $this->conn->run_query(
      'INSERT INTO contact (nom, prenom, adresse, telephone, code_postal, ville) VALUES (?, ?, ?, ?, ?, ?);',
      $nom,
      $prenom,
      $adresse,
      $telephone,
      $codePostal,
      $ville
    );
    return $insertedRow;
  }

  public function update($contact) {
    $id = $contact->getId();
    $nom = $contact->getNom();
    $prenom = $contact->getPrenom();
    $adresse = $contact->getAdresse();
    $telephone = $contact->getTelephone();
    $codePostal = $contact->getCodePostal();
    $ville = $contact->getVille();
    $this->conn->run_query(
      'UPDATE contact SET nom = ?, prenom = ?, adresse = ?, telephone = ?, code_postal = ?, ville = ? WHERE id = ?;',
      $nom,
      $prenom,
      $adresse,
      $telephone,
      $codePostal,
      $ville,
      $id
    );
  }

  public function delete($contact) {
    $id = $contact->getId();
    $this->conn->run_query('DELETE FROM contact WHERE id = ?;', $id);
  }

  public function selectAll() {
    return $this->conn->run_query('SELECT * FROM contact;');
  }

  public function search($nom) {
    return $this->conn->run_query('SELECT * FROM contact WHERE nom = ?;', $nom);
  }
}
?>
