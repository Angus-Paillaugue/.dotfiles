import type { Linter } from 'eslint';
export * as meta from '.pnpm/eslint-plugin-svelte@2.46.1_eslint@9.16.0_jiti@1.21.6__svelte@5.8.1/node_modules/eslint-plugin-svelte/lib/meta';
/** preprocess */
export declare function preprocess(code: string, filename: string): string[];
/** postprocess */
export declare function postprocess([messages]: Linter.LintMessage[][], filename: string): Linter.LintMessage[];
export declare const supportsAutofix = true;
