import type * as Compiler from ".pnpm/svelte-eslint-parser@0.43.0_svelte@5.8.1/node_modules/svelte-eslint-parser/lib/parser/svelte-ast-types-for-v5";
import type * as SvAST from ".pnpm/svelte-eslint-parser@0.43.0_svelte@5.8.1/node_modules/svelte-eslint-parser/lib/parser/svelte-ast-types";
import type { NormalizedParserOptions } from ".pnpm/svelte-eslint-parser@0.43.0_svelte@5.8.1/node_modules/svelte-eslint-parser/lib/parser/parser-options";
import type { SvelteConfig } from ".pnpm/svelte-eslint-parser@0.43.0_svelte@5.8.1/node_modules/svelte-eslint-parser/lib/svelte-config";
/** The context for parsing. */
export type SvelteParseContext = {
    /**
     * Whether to use Runes mode.
     * May be `true` if the user is using Svelte v5.
     * Resolved from `svelte.config.js` or `parserOptions`, but may be overridden by `<svelte:options>`.
     */
    runes: boolean;
    /** The version of "svelte/compiler". */
    compilerVersion: string;
    /** The result of static analysis of `svelte.config.js`. */
    svelteConfig: SvelteConfig | null;
};
export declare function isEnableRunes(svelteConfig: SvelteConfig | null, parserOptions: NormalizedParserOptions): boolean;
export declare function resolveSvelteParseContextForSvelte(svelteConfig: SvelteConfig | null, parserOptions: NormalizedParserOptions, svelteAst: Compiler.Root | SvAST.AstLegacy): SvelteParseContext;
export declare function resolveSvelteParseContextForSvelteScript(svelteConfig: SvelteConfig | null, parserOptions: NormalizedParserOptions): SvelteParseContext;
