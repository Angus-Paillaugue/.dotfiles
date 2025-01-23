<?php
  class Button {
    private $button;

    public function __construct($params = [])
    {
      $label = isset($params['label']) ? $params['label'] : '';
      $variant = isset($params['variant']) ? $params['variant'] : 'primary';
      $type = isset($params['type']) ? $params['type'] : 'submit';
      $class = isset($params['class']) ? $params['class'] : '';
      $disabled = isset($params['disabled']) ? $params['disabled'] : '';
      $this->button = "<button type='submit' class='button $class' variant='$variant' $disabled type='$type'>$label</button>";
    }

    public function construct() {
      return $this->button;
    }
  }
?>
