/**
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import * as React from "react";
import { MotionProps } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/motion/types";
import { MotionComponentConfig } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/motion";
/**
 * I'd rather the return type of `custom` to be implicit but this throws
 * incorrect relative paths in the exported types and API Extractor throws
 * a wobbly.
 *
 * @internal
 */
export declare type CustomDomComponent<Props> = React.ForwardRefExoticComponent<React.PropsWithoutRef<Props & MotionProps> & React.RefAttributes<SVGElement | HTMLElement>>;
export interface CustomMotionComponentConfig {
    forwardMotionProps?: boolean;
}
export declare type CreateConfig = <Instance, RenderState, Props>(Component: string | React.ComponentType<Props>, config: CustomMotionComponentConfig) => MotionComponentConfig<Instance, RenderState>;
/**
 * Convert any React component into a `motion` component. The provided component
 * **must** use `React.forwardRef` to the underlying DOM component you want to animate.
 *
 * ```jsx
 * const Component = React.forwardRef((props, ref) => {
 *   return <div ref={ref} />
 * })
 *
 * const MotionComponent = motion(Component)
 * ```
 *
 * @public
 */
export declare function createMotionProxy(createConfig: CreateConfig): (<Props>(Component: string | React.ComponentType<Props>, customMotionComponentConfig?: CustomMotionComponentConfig) => CustomDomComponent<Props>) & import(".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/render/html/types").HTMLMotionComponents & import(".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/render/svg/types").SVGMotionComponents;
