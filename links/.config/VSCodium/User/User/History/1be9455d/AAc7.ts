/**
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { TransformPoint2D } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/types/geometry";
import { HTMLMotionComponents } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/render/html/types";
import { SVGMotionComponents } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/render/svg/types";
export interface DOMVisualElementOptions {
    /**
     * A function that can map a page point between spaces. Used by Framer
     * to support dragging and layout animations within scaled space.
     *
     * @public
     */
    transformPagePoint?: TransformPoint2D;
    /**
     * Allow `transform` to be set as `"none"` if all transforms are their default
     * values. Switching to this removes the element as a GPU layer which can lead to subtle
     * graphical shifts.
     *
     * @public
     */
    allowTransformNone?: boolean;
    /**
     * Allow this element to be GPU-accelerated. We currently enable this by
     * adding a `translateZ(0)`.
     *
     * @public
     */
    enableHardwareAcceleration?: boolean;
}
export declare type DOMMotionComponents = HTMLMotionComponents & SVGMotionComponents;
