<?php
  class Button {
    private $button;

    public function __construct($params = [])
    {
      $placeholder = isset($params['placeholder']) ? $params['placeholder'] : '';
      $id = isset($params['id']) ? $params['id'] : 'primary';
      $label = isset($params['label']) ? $params['label'] : '';
      $class = isset($params['class']) ? $params['class'] : '';
      $disabled = isset($params['disabled']) ? $params['disabled'] : '';
      $this->button = "
        <div class='block w-full'>
          <label for='input'>Label</label>
          <input type='text' id='$id' placeholder='$placeholder'>
        </div>
      ";
    }

    public function construct() {
      return $this->button;
    }
  }
?>
