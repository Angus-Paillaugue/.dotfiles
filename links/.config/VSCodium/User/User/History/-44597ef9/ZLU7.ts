/**
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { VisualElement } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/render/types";
export declare function collectProjectingAncestors(visualElement: VisualElement, ancestors?: VisualElement[]): VisualElement<any, any>[];
export declare function collectProjectingChildren(visualElement: VisualElement): VisualElement[];
/**
 * Update the layoutState by measuring the DOM layout. This
 * should be called after resetting any layout-affecting transforms.
 */
export declare function updateLayoutMeasurement(visualElement: VisualElement): void;
/**
 * Record the viewport box as it was before an expected mutation/re-render
 */
export declare function snapshotViewportBox(visualElement: VisualElement): void;
