<?php
require_once __DIR__ . '/../../vendor/autoload.php';
use TailwindMerge\TailwindMerge;
/**
 * Class Components
 *
 * This class is a factory class that provides static methods to create various components.
 *
 * @package lib/components
 */
class Components
{
  /**
   * Get the value of an array key if it exists, otherwise return a default value.
   *
   * @param array $arr The array to search for the key.
   * @param string $key The key to search for in the array.
   * @param string $default The default value to return if the key does not exist.
   * @param string $ifTrue The value to return if the key exists. If not set, the value of the key is returned.
   *
   * @return string The value of the key if it exists, otherwise the default value.
   */
  private static function merge($arr, $key, $default = '', $ifTrue = false)
  {
    return array_key_exists($key, $arr) && !empty($arr[$key])
      ? ($ifTrue
        ? $ifTrue
        : $arr[$key])
      : $default;
  }

  /**
   * Button constructor.
   *
   * @param array $params An associative array of parameters to customize the button.
   *   - 'label' (string): The text to display on the button.
   *   - 'variant' (string): The style variant of the button. Default is 'primary'.
   *   - 'type' (string): The type attribute of the button. Default is 'submit'.
   *   - 'class' (string): Additional CSS classes to apply to the button.
   *   - 'disabled' (string): The disabled attribute of the button. Default is ''.
   *
   * 	@return string The HTML string representing the button component.
   */
  public static function Button($params = [])
  {
    $tw = TailwindMerge::instance();
    $label = Components::merge($params, 'label');
    $variant = Components::merge($params, 'variant', 'primary');
    $type = Components::merge($params, 'type', 'submit');
    $class = Components::merge($params, 'class');
    $disabled = Components::merge($params, 'disabled', '', 'disabled');
    $href = Components::merge($params, 'href');
    $id = Components::merge($params, 'id');
    $icon = Components::merge($params, 'icon');
    $variantClasses = [
      'primary' => 'bg-primary-700 text-neutral-200',
      'secondary' => 'bg-neutral-700 text-neutral-400',
      'ghost' => 'border text-neutral-600',
      'danger' => 'bg-red-600 text-white',
      'square' => 'size-10',
    ];
    $variantClasses = implode(
      ' ',
      array_map(fn($val) => $variantClasses[$val], explode(' ', $variant))
    );
    $baseClasses =
      'cursor-pointer transition-all duration-200 ease-in-out px-4 py-2 font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center flex flex-row gap-2 text-center active:scale-95';
    $classes = $tw->merge($baseClasses, $variantClasses, $class);
    $iconHTML = $icon != '' ? Components::Icon(['icon' => $icon]) : '';
    if ($href) {
      echo "<a href='$href' " .
        ($id && 'id=' . $id) .
        " class='$classes' $disabled type='$type'>$iconHTML $label</a>";
    } else {
      echo "<button type='submit' " .
        ($id && 'id=' . $id) .
        " class='$classes' $disabled type='$type'>$iconHTML $label</button>";
    }
  }

  /**
   * Constructor for the component.
   *
   * @param array $params An associative array of parameters.
   *   - 'label' (string): The text to be displayed inside the anchor tag.
   *   - 'href' (string): The URL the anchor tag should link to.
   *   - 'class' (string): Additional CSS classes to be applied to the anchor tag.
   *   - 'disabled' (string): Optional. If set, adds a 'disabled' attribute to the anchor tag.
   *
   *  @return string The HTML string representing the link component.
   */
  public static function Link($params = [])
  {
    $tw = TailwindMerge::instance();
    $label = Components::merge($params, 'label');
    $href = Components::merge($params, 'href');
    $class = Components::merge($params, 'class');
    $id = Components::merge($params, 'id');
    if (Components::merge($params, 'disabled')) {
      $class = $tw->merge(
        $class,
        'cursor-not-allowed text-neutral-400 hover:text-neutral-400 no-underline'
      );
      $href = '#';
    }
    $classes = $tw->merge(
      'cursor-pointer font-medium items-center justify-center inline-flex flex-row gap-2 text-neutral-100 hover:text-neutral-400 underline transition-colors active:scale-95',
      $class
    );
    echo "<a href='$href' " .
      ($id && 'id=' . $id) .
      " class='$classes'>$label</a>";
  }

  /**
   * Constructor for the component.
   *
   * @param array $params An associative array of parameters to configure the component.
   *   - 'placeholder' (string): The placeholder text for the input field.
   *   - 'id' (string): The ID for the input field. Defaults to 'primary'.
   *   - 'label' (string|null): The label text for the input field. If null, no label is rendered.
   *   - 'type' (string): The type of the input field. Defaults to 'text'.
   *   - 'class' (string): The CSS class for the input field.
   *   - 'disabled' (bool): Whether the input field is disabled. If true, the 'disabled' attribute is added.
   *
   *  @return string The HTML string representing the input component.
   */
  public static function Input($params = [])
  {
    $id = Components::merge($params, 'id', false);
    if (!$id) {
      throw new Exception('Input field must have an ID');
    }
    $label = Components::merge(
      $params,
      'label',
      '',
      "<label for='input'>" . Components::merge($params, 'label') . '</label>'
    );
    $placeholder = htmlspecialchars(
      Components::merge(
        $params,
        'placeholder',
        Components::merge($params, 'label')
      ),
      ENT_QUOTES
    );
    $type = Components::merge($params, 'type', 'text');
    $class = Components::merge($params, 'class');
    $disabled = Components::merge($params, 'disabled', '', 'disabled');
    $value = Components::merge($params, 'value');
    $name = Components::merge($params, 'name', $id);
    if ($value) {
      $value = "value='$value'";
    }
    $restParams = ['min', 'max', 'step', 'required', 'pattern', 'autocomplete'];
    $restParams = array_reduce(
      $restParams,
      function ($acc, $param) use ($params) {
        $value = Components::merge($params, $param);
        if ($value) {
          if ($value === true) {
            $acc .= "$param ";
          } elseif ($value === false) {
            $acc .= '';
          } else {
            $acc .= "$param='$value' ";
          }
        }
        return $acc;
      },
      ''
    );
    echo "
        <div class='block w-full'>
          $label
          <input type='$type' $value id='$id' name='$name' class='$class' placeholder='$placeholder' $disabled $restParams />
        </div>
      ";
  }

  /**
   * Constructor for the component class.
   *
   * @param array $params An associative array of parameters.
   *   - 'text' (string): The text content to be displayed in the component.
   *   - 'variant' (string): The variant type of the component. Defaults to 'primary'.
   *     Possible values are 'danger', 'warning', 'success', and 'info'.
   *   - 'class' (string): Additional CSS classes to be applied to the component.
   *
   *  @return string The HTML string representing the input component.
   */
  public static function Alert($params = [])
  {
    $text = Components::merge($params, 'text');
    $variant = Components::merge($params, 'variant', 'danger');
    $alertTemplates = [
      'danger' => '
        <div id="alert-1" class="flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
          <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <span class="sr-only">Info</span>
          <div class="ms-3 text-sm font-medium">
            {text}
          </div>
            <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-1" aria-label="Close">
              <span class="sr-only">Close</span>
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
          </button>
        </div>'
    ];
    if (!array_key_exists($variant, $alertTemplates)) {
      throw new Exception('Invalid variant type');
    }

    echo str_replace('{text}', $text, $alertTemplates[$variant]);
  }

  /**
   * Generates an SVG icon based on the provided parameters.
   *
   * @param array $params An associative array of parameters.
   *                      - 'icon' (string): The name of the icon to generate. Required.
   *                      - 'class' (string): Additional CSS classes to apply to the SVG element. Optional.
   *
   * @return string The generated SVG icon as an HTML string.
   *
   * @throws Exception If the 'icon' parameter is not provided or if an invalid icon name is given.
   */
  public static function Icon($params = [])
  {
    $icon = Components::merge($params, 'icon');
    if (!$icon) {
      throw new Exception('Icon name is required');
    }
    $class = Components::merge($params, 'class');
    $classes = TailwindMerge::instance()->merge('size-6', $class);
    $iconPaths = [
      'plus' => '<path d="M5 12h14"/><path d="M12 5v14"/>',
      'Extérieur' =>
        '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
      'Domicile' =>
        '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/>',
      'arrowRight' => '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
      'birthday' =>
        '<path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/>',
      'weight' =>
        '<circle cx="12" cy="5" r="3"/><path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z"/>',
      'status' =>
        '<circle cx="10" cy="7" r="4"/><path d="M10.3 15H7a4 4 0 0 0-4 4v2"/><circle cx="17" cy="17" r="3"/><path d="m21 21-1.9-1.9"/>',
      'chart' => '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/>',
      'poste' => '<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>'
    ];
    if (!array_key_exists($icon, $iconPaths)) {
      throw new Exception('Invalid icon name');
    }
    return "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='$classes'>$iconPaths[$icon]</svg>";
  }

  /**
   * Generates and outputs a select dropdown component.
   *
   * @param array $params An associative array of parameters for the select component.
   *                      - 'id' (string, required): The ID of the select element.
   *                      - 'label' (string, optional): The label text for the select element.
   *                      - 'class' (string, optional): The CSS class for the select element.
   *                      - 'disabled' (bool, optional): Whether the select element is disabled.
   *                      - 'name' (string, optional): The name attribute for the select element.
   *                      - 'options' (array, optional): An array of options for the select element. Each option can be a string or an associative array with 'value' and 'text' keys.
   *                      - 'value' (string, optional): The value of the option to be selected by default.
   *
   * @throws Exception If the 'id' parameter is not provided.
   */
  public static function Select($params = [])
  {
    $id = Components::merge($params, 'id', false);
    if (!$id) {
      throw new Exception('Select field must have an ID');
    }
    $label = Components::merge(
      $params,
      'label',
      '',
      "<label for='input'>" . Components::merge($params, 'label') . '</label>'
    );
    $class = Components::merge($params, 'class');
    $disabled = Components::merge($params, 'disabled', '', 'disabled');
    $name = Components::merge($params, 'name', $id);
    $optionsHTML = '';
    if (array_key_exists('options', $params)) {
      foreach ($params['options'] as $option) {
        if (is_array($option)) {
          $optionValue = $option['value'];
          $optionText = $option['text'];
        } else {
          $optionValue = $option;
          $optionText = $option;
        }
        $selected =
          $optionValue == Components::merge($params, 'value') ? 'selected' : '';
        $optionsHTML .= "<option value='$optionValue' $selected>$optionText</option>";
      }
    }
    echo "
        <div class='block w-full'>
          $label
          <select id='$id' name='$name' class='$class' $disabled>
            $optionsHTML
          </select>
        </div>
      ";
  }
}

?>
