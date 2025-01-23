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
		return array_key_exists($key, $arr) ? ($ifTrue ? $ifTrue : $arr[$key]) : $default;
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
		$variantClasses = [
			'primary' => 'bg-blue-600 text-white',
			'secondary' => 'bg-neutral-100 text-neutral-600',
			'ghost' => 'border text-neutral-600',
			'danger' => 'bg-red-600 text-white',
			'warning' => 'bg-yellow-600 text-white',
			'info' => 'bg-blue-600 text-white',
			'success' => 'bg-green-600 text-white',
			'square' => 'size-10',
		];
		$variantClasses = implode(
			' ',
			array_map(fn($val) => $variantClasses[$val], explode(' ', $variant))
		);
		echo "<button type='submit' class='cursor-pointer transition-all duration-200 ease-in-out px-4 py-2 font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center flex flex-row gap-2 text-center $variantClasses $class' $disabled type='$type'>$label</button>";
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
		$disabled = Components::merge($params, 'disabled', '', 'disabled');
		echo "<a href='$href' class='cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center inline-flex flex-row gap-2 text-neutral-900 hover:text-neutral-600 transition-colors $class' $disabled>$label</a>";
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
		$id = Components::merge($params, 'id', 'primary');
		$label =
			$params['label'] !== null ? "<label for='input'>" . $params['label'] . '</label>' : '';
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
		$variantClasses = [
			'danger' => 'bg-red-50 text-red-600 border-red-200 before:bg-alertDanger',
			'warning' => 'bg-yellow-50 text-yellow-600 border-yellow-200 before:bg-alertWarning',
			'success' => 'bg-green-50 text-green-600 border-green-200 before:bg-alertSuccess',
			'info' => 'bg-blue-50 text-blue-600 border-blue-200 before:bg-alertInfo',
		];
		echo "<div class='rounded-lg px-4 py-2 flex flex-row border gap-4 items-center before:size-10 before:bg-cover before:bg-center before:bg-no-repeat before:block $variantClasses[$variant] $class'><p class='p-0 m-0'>$text</p></div>";
	}

	public static function Card($params = []) {
		$title = Components::merge($params, 'title');
		$subtitle = Components::merge($params, 'subtitle');
		$class = Components::merge($params, 'class');
		echo "<div class='rounded-lg border p-4 $class'>". $title && "<h2 class='m-0'>$title</h2>" . $subtitle && "<p class='m-0'>$subtitle</p>" . "</div>";
	}
}

?>
