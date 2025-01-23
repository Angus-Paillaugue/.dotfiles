import type { ParserObject } from ".pnpm/svelte-eslint-parser@0.43.0_svelte@5.8.1/node_modules/svelte-eslint-parser/lib/parser/parser-object";
export type UserOptionParser = string | ParserObject | Record<string, string | ParserObject | undefined> | undefined;
/** Get parser for script lang */
export declare function getParserForLang(lang: string | undefined | null, parser: UserOptionParser): string | ParserObject;
/** Get parser */
export declare function getParser(attrs: Record<string, string | undefined>, parser: UserOptionParser): ParserObject;
