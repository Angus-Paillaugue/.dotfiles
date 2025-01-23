<?php
class Formatters {
  public static function formatDate($date) {
    return date('d/m/Y', strtotime($date));
  }
}
?>
