<?php
  class Button {
    private $component;

    public function __construct($params = [])
    {
      $label = isset($params['label']) ? $params['label'] : '';
      $variant = isset($params['variant']) ? $params['variant'] : 'primary';
      $type = isset($params['type']) ? $params['type'] : 'submit';
      $class = isset($params['class']) ? $params['class'] : '';
      $disabled = isset($params['disabled']) ? $params['disabled'] : '';
      $variantClasses = array([
        "primary" => "bg-blue-600 text-white",
        "secondary" => "bg-neutral-100 text-neutral-600",
        "ghost" => "border text-neutral-600",
        "danger" => "bg-red-600 text-white",
        "warning" => "bg-yellow-600 text-white",
        "info" => "bg-blue-600 text-white",
        "success" => "bg-green-600 text-white",
        "square" => "bg-white text-primary border border-primary"
      ]);
      $this->component = "<button type='submit' class='button $class' variant='$variant' $disabled type='$type'>$label</button>";
    }

    public function construct() {
      return $this->component;
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

  class Alert {
    private $component;

    public function __construct($params = [])
    {
      $text = isset($params['text']) ? $params['text'] : '';
      $variant = isset($params['variant']) ? $params['variant'] : 'primary';
      $class = isset($params['class']) ? $params['class'] : '';
      $this->component = "<div class='alert $class' variant='$variant'>$text</div>";
    }

    public function construct() {
      return $this->component;
    }
  }
?>
