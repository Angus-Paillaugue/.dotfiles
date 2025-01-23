import type { Context } from ".pnpm/svelte-eslint-parser@0.43.0_svelte@5.8.1/node_modules/svelte-eslint-parser/lib/context";
/**
 * Svelte parse errors.
 */
export declare class ParseError extends SyntaxError {
    index: number;
    lineNumber: number;
    column: number;
    /**
     * Initialize this ParseError instance.
     */
    constructor(message: string, offset: number, ctx: Context);
}
