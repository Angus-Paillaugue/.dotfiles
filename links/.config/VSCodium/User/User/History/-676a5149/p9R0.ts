/**
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { VisualElement, VisualElementConfig, VisualElementOptions } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/render/types";
export declare const visualElement: <Instance, MutableState, Options>({ treeType, build, getBaseTarget, makeTargetAnimatable, measureViewportBox, render: renderInstance, readValueFromInstance, resetTransform, restoreTransform, removeValueFromRenderState, sortNodePosition, scrapeMotionValuesFromProps, }: VisualElementConfig<Instance, MutableState, Options>) => ({ parent, props, presenceId, blockInitialAnimation, visualState, }: VisualElementOptions<Instance, any>, options?: Options) => VisualElement<Instance, any>;
