
/**
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { VariantLabels } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/motion/types";
import { Writable } from 'svelte/store'
/**
 * @public
 */
export interface PresenceContextProps {
    id: number;
    isPresent: boolean;
    register: (id: number) => () => void;
    onExitComplete?: (id: number) => void;
    initial?: false | VariantLabels;
    custom?: any;
}
/**
 * @public
 */
export declare const PresenceContext: () => Writable<PresenceContextProps | null>
