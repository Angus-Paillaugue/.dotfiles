import { ReadonlyArray, type array } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/arrays.js";
import type { requireKeys } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/records.js";
export type StringifyPathOptions<stringifiable = PropertyKey> = requireKeys<{
    stringifySymbol?: (s: symbol) => string;
    stringifyNonKey?: (o: Exclude<stringifiable, PropertyKey>) => string;
}, stringifiable extends PropertyKey ? never : "stringifyNonKey">;
export type StringifyPathFn = <stringifiable>(path: array<stringifiable>, ...[opts]: [stringifiable] extends [PropertyKey] ? [
    opts?: StringifyPathOptions
] : NoInfer<[opts: StringifyPathOptions<stringifiable>]>) => string;
export type AppendStringifiedKeyFn = <stringifiable>(path: string, prop: stringifiable, ...[opts]: [stringifiable] extends [PropertyKey] ? [
    opts?: StringifyPathOptions
] : NoInfer<[opts: StringifyPathOptions<stringifiable>]>) => string;
export declare const appendStringifiedKey: AppendStringifiedKeyFn;
export declare const stringifyPath: StringifyPathFn;
export declare class ReadonlyPath extends ReadonlyArray<PropertyKey> {
    private cache;
    constructor(...items: array<PropertyKey>);
    stringify(): string;
    stringifyAncestors(): readonly string[];
}
