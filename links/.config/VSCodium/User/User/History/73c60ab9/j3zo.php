<?php
require_once '../../lib/connector.php';

class JoueurDAO {
  private $conn;

  public function __construct() {
    $this->conn = sql_connector::getInstance('R301_projet', 'localhost', 'R301_projet', "R301_projet");
  }

  public function select($joueur) {
    $id = $joueur->getId();
    $data = $this->conn->run_query('SELECT * FROM joueurs WHERE id = ?;', $id);
    $data = $data[0];
  }

  public function insert($joueur) {
    $nom = $joueur->getNom();
    $prenom = $joueur->getPrenom();
    $numeroLicence = $joueur->getNumeroLicence();
    $dateNaissance = $joueur->getDateNaissance();
    $taille = $joueur->getTaille();
    $poids = $joueur->getPoids();
    $statut = $joueur->getStatut();
    $commentaire = $joueur->getCommentaire();
    $insertedRow = $this->conn->run_query(
      'INSERT INTO joueurs (nom, prenom, numero_licence, date_naissance, taille, poids, statut, commentaire) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
      $nom,
      $prenom,
      $numeroLicence,
      $dateNaissance,
      $taille,
      $poids,
      $statut,
      $commentaire
    );
    return $insertedRow;
  }

  public function update($contact) {
    $id = $contact->getId();
    $nom = $contact->getNom();
    $prenom = $contact->getPrenom();
    $numeroLicence = $contact->getNumeroLicence();
    $dateNaissance = $contact->getDateNaissance();
    $taille = $contact->getTaille();
    $poids = $contact->getPoids();
    $statut = $contact->getStatut();
    $commentaire = $contact->getCommentaire();
    $this->conn->run_query(
      'UPDATE joueurs SET nom = ?, prenom = ?, numero_licence = ?, date_naissance = ?, taille = ?, poids = ?, statut = ?, commentaire = ? WHERE id = ?;',
      $nom,
      $prenom,
      $numeroLicence,
      $dateNaissance,
      $taille,
      $poids,
      $statut,
      $commentaire,
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
