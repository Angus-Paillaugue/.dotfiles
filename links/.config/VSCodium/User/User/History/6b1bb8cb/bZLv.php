<?php
  class Button {
    private $button;

    public function __construct($params = [])
    {
      $label = isset($params['label']) ? $params['label'] : '';
      $variant = isset($params['variant']) ? $params['variant'] : 'primary';
      $type = isset($params['type']) ? $params['type'] : 'submit';
      $this->button = "<button type='submit' class='button' variant='$variant' type='$type'>$label</button>";
    }

    public function construct() {
      return $this->button;
    }
  }
?>
