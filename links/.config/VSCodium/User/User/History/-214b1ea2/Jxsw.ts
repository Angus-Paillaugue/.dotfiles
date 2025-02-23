/**
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { SharedLayoutAnimationConfig } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/components/AnimateSharedLayout/types";
import { MotionProps } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/motion/types";
import { AxisBox2D, BoxDelta } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/types/geometry";
import { ResolvedValues } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/render/types";
import { AnimationDefinition } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/render/utils/animation";
export declare type LayoutMeasureListener = (layout: AxisBox2D, prevLayout: AxisBox2D) => void;
export declare type BeforeLayoutMeasureListener = (layout: AxisBox2D) => void;
export declare type LayoutUpdateListener = (layout: AxisBox2D, prevLayout: AxisBox2D, config?: SharedLayoutAnimationConfig) => void;
export declare type UpdateListener = (latest: ResolvedValues) => void;
export declare type AnimationStartListener = () => void;
export declare type AnimationCompleteListener = (definition: AnimationDefinition) => void;
export declare type LayoutAnimationCompleteListener = () => void;
export declare type SetAxisTargetListener = () => void;
export declare type RenderListener = () => void;
export declare type OnViewportBoxUpdate = (box: AxisBox2D, delta: BoxDelta) => void;
/**
 * TODO: Make more of these lifecycle events available as props
 */
export interface VisualElementLifecycles {
    /**
     * A callback that fires whenever the viewport-relative bounding box updates.
     *
     * @public
     */
    onViewportBoxUpdate?(box: AxisBox2D, delta: BoxDelta): void;
    onBeforeLayoutMeasure?(box: AxisBox2D): void;
    onLayoutMeasure?(box: AxisBox2D, prevBox: AxisBox2D): void;
    /**
     * Callback with latest motion values, fired max once per frame.
     *
     * @motion
     *
     * ```jsx
     * function onUpdate(latest) {
     *   console.log(latest.x, latest.opacity)
     * }
     *
     * <MotionDiv animate={{ x: 100, opacity: 0 }} onUpdate={onUpdate} />
     * ```
     */
    onUpdate?(latest: ResolvedValues): void;
    /**
     * Callback when animation defined in `animate` begins.
     *
     * @motion
     *
     * ```jsx
     * function onStart() {
     *   console.log("Animation started")
     * }
     *
     * <MotionDiv animate={{ x: 100 }} onAnimationStart={onStart} />
     * ```
     */
    onAnimationStart?(): void;
    /**
     * Callback when animation defined in `animate` is complete.
     *
     * The provided callback will be called the triggering animation definition.
     * If this is a variant, it'll be the variant name, and if a target object
     * then it'll be the target object.
     *
     * This way, it's possible to figure out which animation has completed.
     *
     * @motion
     *
     * ```jsx
     * function onComplete() {
     *   console.log("Animation completed")
     * }
     *
     * <MotionDiv
     *   animate={{ x: 100 }}
     *   onAnimationComplete={definition => {
     *     console.log('Completed animating', definition)
     *   }}
     * />
     * ```
     */
    onAnimationComplete?(definition: AnimationDefinition): void;
    /**
     * @internal
     */
    onLayoutAnimationComplete?(): void;
    /**
     * @internal
     */
    onUnmount?(): void;
}
export interface LifecycleManager {
    onLayoutMeasure: (callback: LayoutMeasureListener) => () => void;
    notifyLayoutMeasure: LayoutMeasureListener;
    onBeforeLayoutMeasure: (callback: BeforeLayoutMeasureListener) => () => void;
    notifyBeforeLayoutMeasure: BeforeLayoutMeasureListener;
    onLayoutUpdate: (callback: LayoutUpdateListener) => () => void;
    notifyLayoutUpdate: LayoutUpdateListener;
    onViewportBoxUpdate: (callback: OnViewportBoxUpdate) => () => void;
    notifyViewportBoxUpdate: OnViewportBoxUpdate;
    onUpdate: (callback: UpdateListener) => () => void;
    notifyUpdate: UpdateListener;
    onAnimationStart: (callback: AnimationStartListener) => () => void;
    notifyAnimationStart: AnimationStartListener;
    onAnimationComplete: (callback: AnimationCompleteListener) => () => void;
    notifyAnimationComplete: AnimationCompleteListener;
    onLayoutAnimationComplete: (callback: LayoutAnimationCompleteListener) => () => void;
    notifyLayoutAnimationComplete: LayoutAnimationCompleteListener;
    onSetAxisTarget: (callback: SetAxisTargetListener) => () => void;
    notifySetAxisTarget: SetAxisTargetListener;
    onRender: (callback: RenderListener) => () => void;
    notifyRender: RenderListener;
    onUnmount: (callback: () => void) => () => void;
    notifyUnmount: () => void;
    clearAllListeners: () => void;
    updatePropListeners: (props: MotionProps) => void;
}
export declare function createLifecycles(): LifecycleManager;
