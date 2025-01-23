/**
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { WithDepth } from ".pnpm/svelte-motion@0.12.2_svelte@5.8.1/node_modules/svelte-motion/types/render/utils/compare-by-depth";
export declare class FlatTree {
    private children;
    private isDirty;
    add(child: WithDepth): void;
    remove(child: WithDepth): void;
    forEach(callback: (child: WithDepth) => void): void;
}
