<?php
require_once '../../lib/connector.php';

class JoueurDAO {
  private $conn;

  public function __construct() {
    $this->conn = sql_connector::getInstance('R301_projet', 'localhost', 'R301_projet', "R301_projet");
  }

  public function get($joueur) {
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

  public function update($joueur) {
    $id = $joueur->getId();
    $nom = $joueur->getNom();
    $prenom = $joueur->getPrenom();
    $numeroLicence = $joueur->getNumeroLicence();
    $dateNaissance = $joueur->getDateNaissance();
    $taille = $joueur->getTaille();
    $poids = $joueur->getPoids();
    $statut = $joueur->getStatut();
    $commentaire = $joueur->getCommentaire();
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

  public function delete($joueur) {
    $id = $joueur->getId();
    $this->conn->run_query('DELETE FROM joueurs WHERE id = ?;', $id);
  }

  public function getAll() {
    return $this->conn->run_query('SELECT * FROM joueurs;');
  }

  public function search($nom) {
    return $this->conn->run_query('SELECT * FROM joueurs WHERE nom = ?;', $nom);
  }
}
?>
