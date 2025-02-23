import type { OnChangeFn, WithChild, Without } from "../../internal/types.js";
import type { BitsPrimitiveButtonAttributes, BitsPrimitiveDivAttributes } from "../../shared/attributes.js";
import type { Orientation } from ".pnpm/bits-ui@1.0.0-next.67_svelte@5.8.1/node_modules/bits-ui";
export type BaseToggleGroupRootProps = {
    /**
     * Whether the toggle group is disabled or not.
     *
     * @defaultValue false
     */
    disabled?: boolean;
    /**
     * Whether to loop through the items when reaching the end
     * when using the keyboard.
     *
     * @defaultValue true
     */
    loop?: boolean;
    /**
     * The orientation of the toggle group. Used to handle keyboard
     * navigation between items.
     *
     * @defaultValue 'horizontal'
     */
    orientation?: Orientation;
    /**
     * Whether to enable roving focus or not. When enabled, users
     * navigate between the items using the arrow keys. When disabled,
     * users navigate between the items using the tab key.
     */
    rovingFocus?: boolean;
    /**
     * Whether or not the value state is controlled or not. If `true`, the component will not update
     * the value state internally, instead it will call `onValueChange` when it would have
     * otherwise, and it is up to you to update the `value` prop that is passed to the component.
     *
     * @defaultValue false
     */
    controlledValue?: boolean;
};
export type SingleToggleGroupRootPropsWithoutHTML = WithChild<BaseToggleGroupRootProps & {
    type: "single";
    value?: string;
    onValueChange?: OnChangeFn<string>;
}>;
export type SingleToggleGroupRootProps = SingleToggleGroupRootPropsWithoutHTML & Without<BitsPrimitiveDivAttributes, SingleToggleGroupRootPropsWithoutHTML>;
export type MultipleToggleGroupRootPropsWithoutHTML = WithChild<BaseToggleGroupRootProps> & {
    type: "multiple";
    value?: string[];
    onValueChange?: OnChangeFn<string[]>;
};
export type MultipleToggleGroupRootProps = MultipleToggleGroupRootPropsWithoutHTML & Without<BitsPrimitiveDivAttributes, MultipleToggleGroupRootPropsWithoutHTML>;
export type ToggleGroupRootPropsWithoutHTML = SingleToggleGroupRootPropsWithoutHTML | MultipleToggleGroupRootPropsWithoutHTML;
export type ToggleGroupRootProps = ToggleGroupRootPropsWithoutHTML & Without<BitsPrimitiveDivAttributes, ToggleGroupRootPropsWithoutHTML>;
export type ToggleGroupItemSnippetProps = {
    pressed: boolean;
};
export type ToggleGroupItemPropsWithoutHTML = WithChild<{
    /**
     * Whether the toggle item is disabled or not.
     *
     * @defaultValue false
     */
    disabled?: boolean | null | undefined;
    /**
     * The value of the toggle item.
     */
    value: string;
}, ToggleGroupItemSnippetProps>;
export type ToggleGroupItemProps = ToggleGroupItemPropsWithoutHTML & Without<BitsPrimitiveButtonAttributes, ToggleGroupItemPropsWithoutHTML>;
