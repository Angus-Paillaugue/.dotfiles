<?php
  class Button {
    private $button;

    public function __construct($label = '', $variant = "primary", $type = "submit")
    {
      $this->button = "<button type='submit' class='button' variant='$variant' type='$type'>$label</button>";
    }

    public function construct() {
      return $this->button;
    }
  }
?>
