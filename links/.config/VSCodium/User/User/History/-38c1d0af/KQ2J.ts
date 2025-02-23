/// <reference types="react" />
/**
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { FeatureBundle } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/motion/features/types";
export declare type LazyFeatureBundle = () => Promise<FeatureBundle>;
/**
 * @public
 */
export interface LazyProps {
    children?: React.ReactNode;
    /**
     * Can be used to provide a feature bundle synchronously or asynchronously.
     *
     * ```jsx
     * // features.js
     * import { domAnimations } from "framer-motion"
     * export default domAnimations
     *
     * // index.js
     * import { LazyMotion, m } from "framer-motion"
     *
     * const loadFeatures = import("./features.js")
     *   .then(res => res.default)
     *
     * function Component() {
     *   return (
     *     <LazyMotion features={loadFeatures}>
     *       <m.div animate={{ scale: 1.5 }} />
     *     </LazyMotion>
     *   )
     * }
     * ```
     *
     * @public
     */
    features: FeatureBundle | LazyFeatureBundle;
    /**
     * If `true`, will throw an error if a `motion` component renders within
     * a `LazyMotion` component.
     *
     * ```jsx
     * // This component will throw an error that explains using a motion component
     * // instead of the m component will break the benefits of code-splitting.
     * function Component() {
     *   return (
     *     <LazyMotion features={domAnimation} strict>
     *       <MotionDiv />
     *     </LazyMotion>
     *   )
     * }
     * ```
     *
     * @public
     */
    strict?: boolean;
}
