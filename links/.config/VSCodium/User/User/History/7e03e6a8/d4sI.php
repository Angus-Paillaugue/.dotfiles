<?php
  class Helpers {
    public static function e($val, $default = '', $ifTrue = false) {
      return isset($val) ? $ifTrue ? $ifTrue : $val : $default;
    }
  }

  class Button {
    private $component;

    public function __construct($params = [])
    {
      $label = Helpers::e($params['label']);
      $variant = Helpers::e($params['variant'], 'primary');
      $type = Helpers::e($params['type'], 'submit');
      $class = Helpers::e($params['class']);
      $disabled = Helpers::e($params['disabled'], "", "disabled");
      $variantClasses = array(
        "primary" => "bg-blue-600 text-white",
        "secondary" => "bg-neutral-100 text-neutral-600",
        "ghost" => "border text-neutral-600",
        "danger" => "bg-red-600 text-white",
        "warning" => "bg-yellow-600 text-white",
        "info" => "bg-blue-600 text-white",
        "success" => "bg-green-600 text-white",
        "square" => "size-10"
      );
      $variantClasses = $variant.
      $this->component = "<button type='submit' class='cursor-pointer transition-all duration-200 ease-in-out px-4 py-2 font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex flex-row gap-2 items-center $variantClasses[$variant] $class' $disabled type='$type'>$label</button>";
    }

    public function construct() {
      return $this->component;
    }
  }

  class Input {
    private $component;

    public function __construct($params = [])
    {
      $placeholder = Helpers::e($params['placeholder']);
      $id = Helpers::e($params['id'], 'primary');
      $label = isset($params['label']) ? "<label for='input'>".$params['label']."</label>" : '';
      $type = Helpers::e($params['type'], 'text');
      $class = Helpers::e($params['class']);
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
      $text = Helpers::e($params['text'], '');
      $variant = Helpers::e($params['variant'], 'primary');
      $class = Helpers::e($params['class'], '');
      $variantClasses = array(
        "danger" => "bg-red-50 text-red-600 border-red-200 before:bg-alertDanger",
        "warning" => "bg-yellow-50 text-yellow-600 border-yellow-200 before:bg-alertWarning",
        "success" => "bg-green-50 text-green-600 border-green-200 before:bg-alertSuccess",
        "info" => "bg-blue-50 text-blue-600 border-blue-200 before:bg-alertInfo"
      );
      $this->component = "<div class='rounded-lg px-4 py-2 flex flex-row border gap-4 items-center before:size-10 before:bg-cover before:bg-center before:bg-no-repeat before:block $variantClasses[$variant] $class'><p class='p-0 m-0'>$text</p></div>";
    }

    public function construct() {
      return $this->component;
    }
  }
?>
