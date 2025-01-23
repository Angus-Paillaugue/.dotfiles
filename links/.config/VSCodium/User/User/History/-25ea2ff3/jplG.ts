/**
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { RefObject } from "react";
import { Point2D } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/types/geometry";
/** @public */
export interface EventInfo {
    point: Point2D;
}
export declare type EventHandler = (event: MouseEvent | TouchEvent | PointerEvent, info: EventInfo) => void;
export declare type ListenerControls = [() => void, () => void];
export declare type TargetOrRef = EventTarget | RefObject<EventTarget>;
export declare type TargetBasedReturnType<Target> = Target extends EventTarget ? ListenerControls : undefined;
