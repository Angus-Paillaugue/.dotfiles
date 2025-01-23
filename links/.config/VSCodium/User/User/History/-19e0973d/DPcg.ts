/**
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { MotionValue } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/value";
/**
 * @public
 */
export interface ScrollMotionValues {
    scrollX: MotionValue<number>;
    scrollY: MotionValue<number>;
    scrollXProgress: MotionValue<number>;
    scrollYProgress: MotionValue<number>;
}
export interface ScrollOffsets {
    xOffset: number;
    yOffset: number;
    xMaxOffset: number;
    yMaxOffset: number;
}
export declare type GetScrollOffsets = () => ScrollOffsets;
export declare function createScrollMotionValues(): ScrollMotionValues;
export declare function createScrollUpdater(values: ScrollMotionValues, getOffsets: GetScrollOffsets): () => void;
