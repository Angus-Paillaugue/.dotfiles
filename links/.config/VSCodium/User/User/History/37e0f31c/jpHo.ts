import type { Pop } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/type-utils/pop";
type RecursiveSplit<STRING extends string, SEPARATOR extends string = ""> = STRING extends `${infer BEFORE}${SEPARATOR}${infer AFTER}` ? [BEFORE, ...RecursiveSplit<AFTER, SEPARATOR>] : [STRING];
export type Split<STRING extends string, SEPARATOR extends string = "", RESULT extends string[] = RecursiveSplit<STRING, SEPARATOR>> = SEPARATOR extends "" ? Pop<RESULT> : RESULT;
export {};
