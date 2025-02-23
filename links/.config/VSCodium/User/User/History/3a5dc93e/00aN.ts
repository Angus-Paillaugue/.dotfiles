/**
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { MotionProps } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/motion/types";
import { VisualState } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/motion/utils/use-visual-state";
import { CreateVisualElement, VisualElement } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/render/types";
/**
 * @public
 */
export interface FeatureProps extends MotionProps {
    visualElement: VisualElement;
}
export declare type FeatureNames = {
    animation: true;
    exit: true;
    drag: true;
    tap: true;
    focus: true;
    hover: true;
    pan: true;
    layoutAnimation: true;
    measureLayout: true;
};
export declare type FeatureComponent = React.ComponentType<FeatureProps>;
/**
 * @public
 */
export interface FeatureDefinition {
    isEnabled: (props: MotionProps) => boolean;
    Component?: FeatureComponent;
}
export interface FeatureComponents {
    animation?: FeatureComponent;
    exit?: FeatureComponent;
    drag?: FeatureComponent;
    tap?: FeatureComponent;
    focus?: FeatureComponent;
    hover?: FeatureComponent;
    pan?: FeatureComponent;
    layoutAnimation?: FeatureComponent;
    measureLayout?: FeatureComponent;
}
export interface FeatureBundle extends FeatureComponents {
    renderer: CreateVisualElement<any>;
}
export declare type LazyFeatureBundle = () => Promise<FeatureBundle>;
export declare type FeatureDefinitions = {
    [K in keyof FeatureNames]: FeatureDefinition;
};
export declare type RenderComponent<Instance, RenderState> = (Component: string | React.ComponentType, props: MotionProps, ref: React.Ref<Instance>, visualState: VisualState<Instance, RenderState>, isStatic: boolean) => any;
