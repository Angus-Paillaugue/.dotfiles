/**
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { VariantLabels } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/motion/types";
import { Target, TargetAndTransition, TargetResolver, TargetWithKeyframes, Transition } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/types";
import { VisualElement } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/render/types";
import { AnimationType } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/render/utils/types";
export declare type AnimationDefinition = VariantLabels | TargetAndTransition | TargetResolver;
export declare type AnimationOptions = {
    delay?: number;
    transitionOverride?: Transition;
    custom?: any;
    type?: AnimationType;
};
export declare type MakeTargetAnimatable = (visualElement: VisualElement, target: TargetWithKeyframes, origin?: Target, transitionEnd?: Target) => {
    target: TargetWithKeyframes;
    transitionEnd?: Target;
};
/**
 * @internal
 */
export declare function animateVisualElement(visualElement: VisualElement, definition: AnimationDefinition, options?: AnimationOptions): Promise<void>;
export declare function stopAnimation(visualElement: VisualElement): void;
export declare function sortByTreeOrder(a: VisualElement, b: VisualElement): number;
