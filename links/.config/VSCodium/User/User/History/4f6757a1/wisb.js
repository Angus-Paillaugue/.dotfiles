/**
 * This component renders a button or an anchor element based on the presence of the `href` prop.
 * It supports various styles and types, which can be customized through props.
 *
 * @name Button
 *
 * @prop {string} [class] - Additional CSS classes to apply to the button.
 * @prop {string} [href] - If provided, the component renders an anchor element instead of a button.
 * @prop {string} [type='normal'] - The type of button, which determines its styling. Possible values are:
 *   - 'normal': Default button style.
 *   - 'square': Square button style.
 *   - 'circle': Circular button style.
 *   - 'ghost': Ghost button style.
 *   - 'noStyle': No additional styling.
 * @prop {string} [name] - The name attribute for the button or anchor element.
 * @prop {any} [children] - The content to be rendered inside the button or anchor element.
 * @prop {object} [restProps] - Any additional props to be spread onto the button or anchor element.
 *
 * @exemple
 * <Button type="circle" class="my-custom-class" href="https://example.com" name="example">
 *   Click me
 * </Button>
 */
