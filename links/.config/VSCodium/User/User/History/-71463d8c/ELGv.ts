import type ESTree from "estree";
import type { BaseNode } from ".pnpm/svelte-eslint-parser@0.43.0_svelte@5.8.1/node_modules/svelte-eslint-parser/lib/ast/base";
export type SvelteScriptNode = SvelteReactiveStatement;
/** Node of `$` statement. */
export interface SvelteReactiveStatement extends BaseNode {
    type: "SvelteReactiveStatement";
    label: ESTree.Identifier & {
        name: "$";
    };
    body: ESTree.Statement;
    parent: ESTree.Node;
}
