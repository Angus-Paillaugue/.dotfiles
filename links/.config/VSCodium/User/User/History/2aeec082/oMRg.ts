import { type UserOptionParser } from ".pnpm/svelte-eslint-parser@0.43.0_svelte@5.8.1/node_modules/svelte-eslint-parser/lib/parser/resolve-parser";
export type NormalizedParserOptions = {
    parser?: UserOptionParser;
    project?: string | string[] | null;
    ecmaVersion: number | "latest";
    sourceType: "module" | "script";
    ecmaFeatures?: {
        globalReturn?: boolean | undefined;
        impliedStrict?: boolean | undefined;
        jsx?: boolean | undefined;
        experimentalObjectRestSpread?: boolean | undefined;
        [key: string]: any;
    };
    svelteFeatures?: {
        runes?: boolean;
        experimentalGenerics?: boolean;
    };
    loc: boolean;
    range: boolean;
    raw: boolean;
    tokens: boolean;
    comment: boolean;
    eslintVisitorKeys: boolean;
    eslintScopeManager: boolean;
    filePath?: string;
};
/** Normalize parserOptions */
export declare function normalizeParserOptions(options: any): NormalizedParserOptions;
export declare function isTypeScript(parserOptions: NormalizedParserOptions, lang: string | undefined): boolean;
