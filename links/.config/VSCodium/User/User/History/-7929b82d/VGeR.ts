import type { OnChangeFn, WithChild, Without } from "../../internal/types.js";
import type { Orientation } from ".pnpm/bits-ui@1.0.0-next.66_svelte@5.8.1/node_modules/bits-ui";
import type { BitsPrimitiveButtonAttributes, BitsPrimitiveDivAttributes } from "../../shared/attributes.js";
export type RadioGroupRootPropsWithoutHTML = WithChild<{
    /**
     * The orientation of the radio group. Used to determine
     * how keyboard navigation should work.
     *
     * @defaultValue "vertical"
     */
    orientation?: Orientation;
    /**
     * Whether to loop around the radio items when navigating
     * with the keyboard.
     *
     * @defaultValue true
     */
    loop?: boolean;
    /**
     * The value of the selected radio item.
     *
     * @defaultValue ""
     */
    value?: string;
    /**
     * The callback to call when the selected radio item changes.
     */
    onValueChange?: OnChangeFn<string>;
    /**
     * The name to apply to the radio group's input element for
     * form submission. If not provided, a hidden input will not
     * be rendered and the radio group will not be part of a form.
     *
     * @defaultValue undefined
     */
    name?: string;
    /**
     * Whether the radio group is disabled.
     *
     * @defaultValue false
     */
    disabled?: boolean;
    /**
     * Whether the radio group is required for form submission.
     * If `true`, ensure you provide a `name` prop so the hidden
     * input is rendered.
     */
    required?: boolean;
    /**
     * Whether or not the value state is controlled or not. If `true`, the component will not update
     * the value state internally, instead it will call `onValueChange` when it would have
     * otherwise, and it is up to you to update the `value` prop that is passed to the component.
     *
     * @defaultValue false
     */
    controlledValue?: boolean;
}>;
export type RadioGroupRootProps = RadioGroupRootPropsWithoutHTML & Without<BitsPrimitiveDivAttributes, RadioGroupRootPropsWithoutHTML>;
export type RadioGroupItemSnippetProps = {
    checked: boolean;
};
export type RadioGroupItemPropsWithoutHTML = WithChild<{
    /**
     * The value of the radio item.
     */
    value: string;
    /**
     * Whether the radio item is disabled.
     *
     * @defaultValue false
     */
    disabled?: boolean | null | undefined;
}, RadioGroupItemSnippetProps>;
export type RadioGroupItemProps = RadioGroupItemPropsWithoutHTML & Without<BitsPrimitiveButtonAttributes, RadioGroupItemPropsWithoutHTML>;
