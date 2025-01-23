/**
 * This component renders a button or an anchor element based on the presence of the `href` prop.
 * It supports various styles and types, which can be customized through props.
 *
 * @name Button
 *
 * @param {string} [class] - Additional CSS classes to apply to the button.
 * @param {string} [href] - If provided, the component renders an anchor element instead of a button.
 * @param {string} [type='normal|square|circle|ghost|noStyle'] - The type of button, which determines its styling.
 * @param {string} [name] - The name attribute for the button or anchor element.
 * @param {any} [children] - The content to be rendered inside the button or anchor element.
 * @param {object} [restProps] - Any additional props to be spread onto the button or anchor element.
 *
 * @example
 * <Button type="circle" class="my-custom-class" href="https://example.com" name="example">
 *   Click me
 * </Button>
 */
