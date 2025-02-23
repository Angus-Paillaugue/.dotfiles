import type { SvelteLetDirective, SvelteName } from ".pnpm/svelte-eslint-parser@0.43.0_svelte@5.8.1/node_modules/svelte-eslint-parser/lib/ast";
import type * as ESTree from "estree";
import type { ScriptLetBlockParam, ScriptLetCallback } from ".pnpm/svelte-eslint-parser@0.43.0_svelte@5.8.1/node_modules/svelte-eslint-parser/lib/context/script-let";
/** A class that collects pattern nodes for Let directives. */
export declare class LetDirectiveCollection {
    private readonly list;
    getLetParams(): ScriptLetBlockParam[];
    addPattern(pattern: ESTree.Pattern | SvelteName, directive: SvelteLetDirective, typing: string, ...callbacks: ScriptLetCallback<ESTree.Pattern>[]): ScriptLetCallback<ESTree.Pattern>[];
}
export declare class LetDirectiveCollections {
    private readonly stack;
    beginExtract(): void;
    getCollection(): LetDirectiveCollection;
    extract(): LetDirectiveCollection;
}
