/**
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { SvelteComponent } from "svelte";
import { MotionConfigContextObject } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/context/MotionConfigContext.js";
export declare type MotionConfigProps = Partial<MotionConfigContextObject>
/**
 * `MotionConfig` is used to set configuration options for all children `motion` components.
 *
 * ```jsx
 * import { MotionDiv, MotionConfig } from "svelte-motion"
 *
 * <MotionConfig transition={{ type: "spring" }}>
 *   <MotionDiv animate={{ x: 100 }} />
 * </MotionConfig>
 * ```
 *
 * @public
 */
export declare class MotionConfig extends SvelteComponent<MotionConfigProps,ATypedSvelteComponent,{default:{}}>{}
