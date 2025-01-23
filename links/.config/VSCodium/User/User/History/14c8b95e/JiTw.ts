/**
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { Writable } from 'svelte/store'
import { SharedLayoutSyncMethods, SyncLayoutBatcher } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/components/AnimateSharedLayout/types";
export declare const SharedLayoutContext: () => Writable<SyncLayoutBatcher | SharedLayoutSyncMethods>;
/**
 * @internal
 */
//export declare const FramerTreeLayoutContext: import("react").Context<SyncLayoutBatcher | SharedLayoutSyncMethods>;
export declare function isSharedLayout(context: SyncLayoutBatcher | SharedLayoutSyncMethods): context is SharedLayoutSyncMethods;
