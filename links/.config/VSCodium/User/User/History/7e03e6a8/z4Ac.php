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

  class Input {
    private $component;

    public function __construct($params = [])
    {
      $placeholder = isset($params['placeholder']) ? $params['placeholder'] : '';
      $id = isset($params['id']) ? $params['id'] : 'primary';
      $label = isset($params['label']) ? "<label for='input'>".$params['label']."</label>" : '';
      $type = isset($params['type']) ? $params['type'] : 'text';
      $class = isset($params['class']) ? $params['class'] : '';
      $this->component = "
        <div class='block w-full'>
          $label
          <input type='$type' id='$id' class='$class' placeholder='$placeholder'>
        </div>
      ";
    }

    public function construct() {
      return $this->component;
    }
  }
?>
