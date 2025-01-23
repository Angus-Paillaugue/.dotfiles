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
        "square" => "size-10 flex flex-col items-center justify-center"
      ]);
      $this->component = "<button type='submit' class='button $variantClasses[$variant] $class' $disabled type='$type'>$label</button>";
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
      $variantClasses = array([
        "danger" => "bg-red-50 text-red-600 border-red-200 before:bg-alertDanger",
        "warning" => "bg-yellow-50 text-yellow-600 border-yellow-200 before:bg-alertWarning",
        "success" => "bg-green-50 text-green-600 border-green-200 before:bg-alertSuccess",
        "info" => "bg-blue-50 text-blue-600 border-blue-200 before:bg-alertInfo"
      ]);
      $this->component = "<div class='rounded-lg px-4 py-2 flex flex-row border gap-4 items-center before:size-10 before:bg-cover before:bg-center before:bg-no-repeat before:block $variantClasses[$variant] $class'>$text</div>";
    }

    public function construct() {
      return $this->component;
    }
  }
?>
