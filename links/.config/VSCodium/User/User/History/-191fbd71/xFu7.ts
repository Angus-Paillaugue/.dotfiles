/**
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { VisualElement } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/render/types";
import { Transition } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/types";
import { AxisBox2D } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/types/geometry";
import { MotionValue } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/value";
/**
 * @public
 */
export declare enum Presence {
    Entering = 0,
    Present = 1,
    Exiting = 2
}
/**
 * @public
 */
export declare enum VisibilityAction {
    Hide = 0,
    Show = 1
}
/**
 * @public
 */
export interface SharedLayoutProps {
    /**
     * @public
     */
    //children: React.ReactNode;
    /**
     * When combined with `AnimatePresence`, `SharedLayoutProps` can customise how to visually switch
     * between `layoutId` components as new ones enter and leave the tree.
     *
     * - "switch" (default): The old `layoutId` component will be hidden instantly when a new one enters, and
     * the new one will perform the full transition. When the newest one is removed, it will perform
     * the full exit transition and then the old component will be shown instantly.
     * - "crossfade": The root shared components will crossfade as `layoutId` children of both perform
     * the same transition.
     *
     * @public
     */
    type?: "switch" | "crossfade";
}
export interface SharedLayoutAnimationConfig {
    visibilityAction?: VisibilityAction;
    originBox?: AxisBox2D;
    targetBox?: AxisBox2D;
    transition?: Transition;
    crossfadeOpacity?: MotionValue<number>;
    shouldStackAnimate?: boolean;
    onComplete?: () => void;
    isRelative?: boolean;
    prevParent?: VisualElement;
}
/**
 * Handlers for batching sync layout lifecycles. We batches these processes to cut
 * down on layout thrashing
 *
 * @public
 */
export interface SyncLayoutLifecycles {
    layoutReady: (child: VisualElement) => void;
    parent?: VisualElement;
}
/**
 * The exposed API for children to add themselves to the batcher and to flush it.
 *
 * @public
 */
export interface SyncLayoutBatcher {
    add: (child: VisualElement) => void;
    flush: (handler?: SyncLayoutLifecycles) => void;
}
/**
 * Extra API methods available to children if they're a descendant of AnimateSharedLayout
 */
export interface SharedLayoutSyncMethods extends SyncLayoutBatcher {
    syncUpdate: (force?: boolean) => void;
    forceUpdate: () => void;
    register: (child: VisualElement) => void;
    remove: (child: VisualElement) => void;
}
