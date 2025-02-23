/**
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { RefObject } from "react";
import { AnyPointerEvent, PanInfo } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/gestures/PanSession";
import { DraggableProps } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/gestures/drag/types";
import { TransformPoint2D, AxisBox2D, Point2D } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/types/geometry";
import { VisualElement } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/render/types";
import { MotionProps } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/motion/types";
export declare const elementDragControls: WeakMap<VisualElement<any, any>, VisualElementDragControls>;
interface DragControlConfig {
    visualElement: VisualElement;
}
export interface DragControlOptions {
    snapToCursor?: boolean;
    cursorProgress?: Point2D;
}
interface DragControlsProps extends DraggableProps {
    transformPagePoint?: TransformPoint2D;
}
declare type DragDirection = "x" | "y";
export declare class VisualElementDragControls {
    /**
     * Track whether we're currently dragging.
     *
     * @internal
     */
    isDragging: boolean;
    /**
     * The current direction of drag, or `null` if both.
     *
     * @internal
     */
    private currentDirection;
    /**
     * The permitted boundaries of travel, in pixels.
     *
     * @internal
     */
    private constraints;
    /**
     * The per-axis resolved elastic values.
     *
     * @internal
     */
    private elastic;
    /**
     * A reference to the host component's latest props.
     *
     * @internal
     */
    private props;
    /**
     * @internal
     */
    private visualElement;
    /**
     * @internal
     */
    private hasMutatedConstraints;
    /**
     * @internal
     */
    private cancelLayout?;
    /**
     * Track the initial position of the cursor relative to the dragging element
     * when dragging starts as a value of 0-1 on each axis. We then use this to calculate
     * an ideal bounding box for the VisualElement renderer to project into every frame.
     *
     * @internal
     */
    cursorProgress: Point2D;
    private originPoint;
    private openGlobalLock;
    /**
     * @internal
     */
    private panSession;
    /**
     * A reference to the measured constraints bounding box
     */
    private constraintsBox?;
    constructor({ visualElement }: DragControlConfig);
    /**
     * Instantiate a PanSession for the drag gesture
     *
     * @public
     */
    start(originEvent: AnyPointerEvent, { snapToCursor, cursorProgress }?: DragControlOptions): void;
    resolveDragConstraints(): void;
    resolveRefConstraints(layoutBox: AxisBox2D, constraints: RefObject<Element>): {
        x: {
            /**
             * Track the initial position of the cursor relative to the dragging element
             * when dragging starts as a value of 0-1 on each axis. We then use this to calculate
             * an ideal bounding box for the VisualElement renderer to project into every frame.
             *
             * @internal
             */
            min: number;
            max: number;
        };
        y: {
            /**
             * Track the initial position of the cursor relative to the dragging element
             * when dragging starts as a value of 0-1 on each axis. We then use this to calculate
             * an ideal bounding box for the VisualElement renderer to project into every frame.
             *
             * @internal
             */
            min: number;
            max: number;
        };
    };
    cancelDrag(): void;
    stop(event: AnyPointerEvent, info: PanInfo): void;
    snapToCursor(point: Point2D): boolean;
    /**
     * Update the specified axis with the latest pointer information.
     */
    updateAxis(axis: DragDirection, point: Point2D, offset?: Point2D): void;
    updateAxisMotionValue(axis: DragDirection, offset?: Point2D): void;
    updateVisualElementAxis(axis: DragDirection, point: Point2D): void;
    setProps({ drag, dragDirectionLock, dragPropagation, dragConstraints, dragElastic, dragMomentum, ...remainingProps }: DragControlsProps & MotionProps): void;
    /**
     * Drag works differently depending on which props are provided.
     *
     * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
     * - If the component will perform layout animations, we output the gesture to the component's
     *      visual bounding box
     * - Otherwise, we apply the delta to the x/y motion values.
     */
    private getAxisMotionValue;
    private isLayoutDrag;
    private isExternalDrag;
    private animateDragEnd;
    stopMotion(): void;
    private startAxisValueAnimation;
    scalePoint(): void;
    updateConstraints(onReady?: () => void): void;
    mount(visualElement: VisualElement): () => void;
}
export declare function expectsResolvedDragConstraints({ dragConstraints, onMeasureDragConstraints, }: MotionProps): boolean;
export {};
