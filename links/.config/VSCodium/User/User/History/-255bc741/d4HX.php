<?php
class Formatters
{
  public static function formatDate($date)
  {
    return date('d/m/Y', strtotime($date));
  }

  public static function formatDateTime($date)
  {
    return date('d/m/Y H:i', strtotime($date));
  }

  public static function formatWeight($weight)
  {
    return $weight . 'kg';
  }

  public static function formatNote($note)
  {
    return number_format($note, 1);
  }
}
?>
