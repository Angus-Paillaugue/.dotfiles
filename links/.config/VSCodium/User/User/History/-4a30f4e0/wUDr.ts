/**
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { Point2D, TransformPoint2D } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/types/geometry";
export declare type AnyPointerEvent = MouseEvent | TouchEvent | PointerEvent;
/**
 * Passed in to pan event handlers like `onPan` the `PanInfo` object contains
 * information about the current state of the tap gesture such as its
 * `point`, `delta`, `offset` and `velocity`.
 *
 * @motion
 *
 * ```jsx
 * <MotionDiv onPan={(event, info) => {
 *   console.log(info.point.x, info.point.y)
 * }} />
 * ```
 *
 * @public
 */
export interface PanInfo {
    /**
     * Contains `x` and `y` values for the current pan position relative
     * to the device or page.
     *
     * @motion
     *
     * ```jsx
     * function onPan(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <MotionDiv onPan={onPan} />
     * ```
     *
     * @public
     */
    point: Point2D;
    /**
     * Contains `x` and `y` values for the distance moved since
     * the last event.
     *
     * @motion
     *
     * ```jsx
     * function onPan(event, info) {
     *   console.log(info.delta.x, info.delta.y)
     * }
     *
     * <MotionDiv onPan={onPan} />
     * ```
     *
     * @public
     */
    delta: Point2D;
    /**
     * Contains `x` and `y` values for the distance moved from
     * the first pan event.
     *
     * @motion
     *
     * ```jsx
     * function onPan(event, info) {
     *   console.log(info.offset.x, info.offset.y)
     * }
     *
     * <MotionDiv onPan={onPan} />
     * ```
     *
     * @public
     */
    offset: Point2D;
    /**
     * Contains `x` and `y` values for the current velocity of the pointer, in px/ms.
     *
     * @motion
     *
     * ```jsx
     * function onPan(event, info) {
     *   console.log(info.velocity.x, info.velocity.y)
     * }
     *
     * <MotionDiv onPan={onPan} />
     * ```
     *
     * @public
     */
    velocity: Point2D;
}
export declare type PanHandler = (event: Event, info: PanInfo) => void;
interface PanSessionHandlers {
    onSessionStart: PanHandler;
    onStart: PanHandler;
    onMove: PanHandler;
    onEnd: PanHandler;
    onSessionEnd: PanHandler;
}
interface PanSessionOptions {
    transformPagePoint?: TransformPoint2D;
}
/**
 * @internal
 */
export declare class PanSession {
    /**
     * @internal
     */
    private history;
    /**
     * @internal
     */
    private startEvent;
    /**
     * @internal
     */
    private lastMoveEvent;
    /**
     * @internal
     */
    private lastMoveEventInfo;
    /**
     * @internal
     */
    private transformPagePoint?;
    /**
     * @internal
     */
    private handlers;
    /**
     * @internal
     */
    private removeListeners;
    constructor(event: AnyPointerEvent, handlers: Partial<PanSessionHandlers>, { transformPagePoint }?: PanSessionOptions);
    private updatePoint;
    private handlePointerMove;
    private handlePointerUp;
    updateHandlers(handlers: Partial<PanSessionHandlers>): void;
    end(): void;
}
export {};
