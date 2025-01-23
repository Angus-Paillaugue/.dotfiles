<?php
class SupprimerUnContact {

  public static function exec($id) {
    $conn = sql_connector::getInstance('section4', 'localhost', 'school', '\$iutinfo');
    $conn->run_query('DELETE FROM contact WHERE id = ?;', $id);
  }
}
?>
