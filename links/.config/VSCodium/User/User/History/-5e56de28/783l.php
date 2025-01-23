<?php
require_once '../../lib/connector.php';
require_once 'FeuilleMatch.php';

class FeuillMatchDAO {
  private $conn;

  public function __construct() {
    $this->conn = sql_connector::getInstance();
  }

  public function get($feuillMatch) {
    $id = $feuillMatch->getId();
    $data = $this->conn->run_query('SELECT * FROM feuille_match WHERE id = ?;', $id);
    $data = $data[0];
  }

  public function insert($feuillMatch) {
    $id_rencontre = $feuillMatch->getIdRencontre();
    $id_joueur = $feuillMatch->getIdJoueur();
    $role_debut = $feuillMatch->getRoleDebut();
    $role_fin = $feuillMatch->getRoleFin();
    $poste = $feuillMatch->getPoste();
    $evaluation = $feuillMatch->getEvaluation();
    $insertedRow = $this->conn->run_query(
      'INSERT INTO feuille_match (id_rencontre, id_joueur, role_debut, role_fin, poste, evaluation) VALUES (?, ?, ?, ?, ?, ?);',
      $id_rencontre,
      $id_joueur,
      $role_debut,
      $role_fin,
      $poste,
      $evaluation
    );
    return $insertedRow;
  }

  public function update($feuillMatch) {
    $id = $feuillMatch->getId();
    $id_rencontre = $feuillMatch->getIdRencontre();
    $id_joueur = $feuillMatch->getIdJoueur();
    $role_debut = $feuillMatch->getRoleDebut();
    $role_fin = $feuillMatch->getRoleFin();
    $poste = $feuillMatch->getPoste();
    $evaluation = $feuillMatch->getEvaluation();
    $this->conn->run_query(
      'UPDATE feuille_match SET id_rencontre = ?, id_joueur = ?, role_debut = ?, role_fin = ?, poste = ?, evaluation = ? WHERE id = ?;',
      $id_rencontre,
      $id_joueur,
      $role_debut,
      $role_fin,
      $poste,
      $evaluation,
      $id
    );
  }

  public function delete($feuillMatch) {
    $id = $feuillMatch->getId();
    $this->conn->run_query('DELETE FROM feuille_match WHERE id = ?;', $id);
  }

  public function getAll() {
    $data = $this->conn->run_query('SELECT * FROM feuille_match;');

    $dataArray = array();

    foreach ($data as $feuillMatch) {
      $feuillMatch = new FeuilleMatch($feuillMatch['id_rencontre'], $feuillMatch['id_joueur'], $feuillMatch['role_debut'], $feuillMatch['role_fin'], $feuillMatch['poste'], $feuillMatch['evaluation']);
      $feuillMatch->setId($feuillMatch['id']);
      array_push($dataArray, $feuillMatch);
    }
    return $dataArray;
  }
}
?>
