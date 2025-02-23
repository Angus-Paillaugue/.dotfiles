/**
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import * as React from "react";
import { VisualElementDragControls, DragControlOptions } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/gestures/drag/VisualElementDragControls";
/**
 * Can manually trigger a drag gesture on one or more `drag`-enabled `motion` components.
 *
 * @motion
 *
 * ```jsx
 * const dragControls = useDragControls()
 *
 * function startDrag(event) {
 *   dragControls.start(event, { snapToCursor: true })
 * }
 *
 * <div onPointerDown={startDrag} />
 * <MotionDiv drag="x" dragControls={dragControls} />
 * ```
 *
 * @public
 */
export declare class DragControls {
    private componentControls;
    /**
     * Subscribe a component's internal `VisualElementDragControls` to the user-facing API.
     *
     * @internal
     */
    subscribe(controls: VisualElementDragControls): () => void;
    /**
     * Start a drag gesture on every `motion` component that has this set of drag controls
     * passed into it via the `dragControls` prop.
     *
     * ```jsx
     * dragControls.start(e, {
     *   snapToCursor: true
     * })
     * ```
     *
     * @param event - PointerEvent
     * @param options - Options
     *
     * @public
     */
    start(event: MouseEvent | TouchEvent | PointerEvent, options?: DragControlOptions): void;
    updateConstraints(flush?: boolean): void;
}
/**
 * Usually, dragging is initiated by pressing down on a `motion` component with a `drag` prop
 * and moving it. For some use-cases, for instance clicking at an arbitrary point on a video scrubber, we
 * might want to initiate that dragging from a different component than the draggable one.
 *
 * By creating a `dragControls` using the `useDragControls` hook, we can pass this into
 * the draggable component's `dragControls` prop. It exposes a `start` method
 * that can start dragging from pointer events on other components.
 *
 * @motion
 *
 * ```jsx
 * const dragControls = useDragControls()
 *
 * function startDrag(event) {
 *   dragControls.start(event, { snapToCursor: true })
 * }
 *
 * return (
 *   <>
 *     <div onPointerDown={startDrag} />
 *     <MotionDiv drag="x" dragControls={dragControls} />
 *   </>
 * )
 * ```
 *
 * @public
 */
export declare function useDragControls(): DragControls;
