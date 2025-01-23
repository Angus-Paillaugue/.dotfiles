<?php

/**
 * Class Components
 *
 * This class is a factory class that provides static methods to create various components.
 *
 * @package School\Lib\Components
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
    $label = Components::merge($params, 'label');
    $variant = Components::merge($params, 'variant', 'primary');
    $type = Components::merge($params, 'type', 'submit');
    $class = Components::merge($params, 'class');
    $disabled = Components::merge($params, 'disabled', '', 'disabled');
    $href = Components::merge($params, 'href');
    $id = Components::merge($params, 'id');
    $variantClasses = [
      'primary' => 'bg-primary-600 text-white',
      'secondary' => 'bg-neutral-100 text-neutral-600',
      'ghost' => 'border text-neutral-600',
      'danger' => 'bg-red-600 text-white',
      'warning' => 'bg-yellow-600 text-white',
      'info' => 'bg-primary-600 text-white',
      'success' => 'bg-green-600 text-white',
      'square' => 'size-10',
    ];
    $variantClasses = implode(
      ' ',
      array_map(fn($val) => $variantClasses[$val], explode(' ', $variant))
    );
    $baseClasses =
      'cursor-pointer transition-all duration-200 ease-in-out px-4 py-2 font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center flex flex-row gap-2 text-center';
    if ($href) {
      echo "<a href='$href' " .
        ($id && 'id=' . $id) .
        " class='$baseClasses $variantClasses $class' $disabled type='$type'>$label</a>";
    } else {
      echo "<button type='submit' " .
        ($id && 'id=' . $id) .
        " class='$baseClasses $variantClasses $class' $disabled type='$type'>$label</button>";
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
    $label = Components::merge($params, 'label');
    $href = Components::merge($params, 'href');
    $class = Components::merge($params, 'class');
    $id = Components::merge($params, 'id');
    $disabled = Components::merge($params, 'disabled', '', 'disabled');
    echo "<a href='$href' " .
      ($id && 'id=' . $id) .
      " class='cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center inline-flex flex-row gap-2 text-neutral-900 hover:text-primary-600 underline transition-colors $class' $disabled>$label</a>";
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
    $placeholder = htmlspecialchars(Components::merge($params, 'placeholder'), ENT_QUOTES);
    $id = Components::merge($params, 'id', false);
    if (!$id) {
      throw new Exception('Input field must have an ID');
    }
    $label = $params['label'] !== null ? "<label for='input'>" . $params['label'] . '</label>' : '';
    $type = Components::merge($params, 'type', 'text');
    $class = Components::merge($params, 'class');
    $disabled = Components::merge($params, 'disabled', '', 'disabled');
    echo "
        <div class='block w-full'>
          $label
          <input type='$type' id='$id' name='$id' class='$class' placeholder='$placeholder' $disabled />
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
    $variant = Components::merge($params, 'variant', 'primary');
    $class = Components::merge($params, 'class');
    $id = Components::merge($params, 'id');
    $variantClasses = [
      'danger' => 'bg-red-50 text-red-600 border-red-200 before:bg-alertDanger',
      'warning' => 'bg-yellow-50 text-yellow-600 border-yellow-200 before:bg-alertWarning',
      'success' => 'bg-green-50 text-green-600 border-green-200 before:bg-alertSuccess',
      'info' => 'bg-primary-50 text-primary-600 border-primary-200 before:bg-alertInfo',
    ];
    $backgroundImages = array(
        'danger' => "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNkYzI2MjYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaXJjbGUtYWxlcnQiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PGxpbmUgeDE9IjEyIiB4Mj0iMTIiIHkxPSI4IiB5Mj0iMTIiLz48bGluZSB4MT0iMTIiIHgyPSIxMi4wMSIgeTE9IjE2IiB5Mj0iMTYiLz48L3N2Zz4=');",
        'warning' => "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNjYThhMDQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS10cmlhbmdsZS1hbGVydCI+PHBhdGggZD0ibTIxLjczIDE4LTgtMTRhMiAyIDAgMCAwLTMuNDggMGwtOCAxNEEyIDIgMCAwIDAgNCAyMWgxNmEyIDIgMCAwIDAgMS43My0zIi8+PHBhdGggZD0iTTEyIDl2NCIvPjxwYXRoIGQ9Ik0xMiAxN2guMDEiLz48L3N2Zz4=');",
        'success' => "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxNmEzNGEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1iYWRnZS1jaGVjayI+PHBhdGggZD0iTTMuODUgOC42MmE0IDQgMCAwIDEgNC43OC00Ljc3IDQgNCAwIDAgMSA2Ljc0IDAgNCA0IDAgMCAxIDQuNzggNC43OCA0IDQgMCAwIDEgMCA2Ljc0IDQgNCAwIDAgMS00Ljc3IDQuNzggNCA0IDAgMCAxLTYuNzUgMCA0IDQgMCAwIDEtNC43OC00Ljc3IDQgNCAwIDAgMSAwLTYuNzZaIi8+PHBhdGggZD0ibTkgMTIgMiAyIDQtNCIvPjwvc3ZnPg==');",
        'info' => "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMyNTYzZWIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1pbmZvIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwYXRoIGQ9Ik0xMiAxNnYtNCIvPjxwYXRoIGQ9Ik0xMiA4aC4wMSIvPjwvc3ZnPg==');"
    ); 
    echo '<div ' .
      ($id && 'id=' . $id) .
      " class='rounded-lg px-4 py-2 flex flex-row border gap-4 items-center before:size-10 before:bg-cover before:bg-center before:bg-no-repeat before:block $variantClasses[$variant] $class' style='background-image: $backgroundImages[$variant];'><p class='p-0 m-0'>$text</p></div>";
  }
}

?>
