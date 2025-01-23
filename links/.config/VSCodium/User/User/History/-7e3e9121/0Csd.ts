/**
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { VariantLabels } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/motion/types";
import { TargetAndTransition } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/types";
import { VisualElement } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/render/types";
import { AnimationOptions } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/render/utils/animation";
import { AnimationType } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/render/utils/types";
export interface AnimationState {
    animateChanges: (options?: AnimationOptions, type?: AnimationType) => Promise<any>;
    setActive: (type: AnimationType, isActive: boolean, options?: AnimationOptions) => Promise<any>;
    setAnimateFunction: (fn: any) => void;
    isAnimated(key: string): boolean;
    getState: () => {
        [key: string]: AnimationTypeState;
    };
}
export declare type AnimationList = string[] | TargetAndTransition[];
export declare const variantPriorityOrder: AnimationType[];
export declare function createAnimationState(visualElement: VisualElement): AnimationState;
export declare function variantsHaveChanged(prev: any, next: any): boolean;
export interface AnimationTypeState {
    isActive: boolean;
    protectedKeys: {
        [key: string]: true;
    };
    needsAnimating: {
        [key: string]: boolean;
    };
    prevResolvedValues: {
        [key: string]: any;
    };
    prevProp?: VariantLabels | TargetAndTransition;
}
