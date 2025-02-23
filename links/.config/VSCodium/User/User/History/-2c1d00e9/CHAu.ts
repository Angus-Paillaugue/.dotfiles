import type { array } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/arrays.js";
import { type Primitive } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/domain.js";
export type SerializationOptions = {
    onCycle?: (value: object) => string;
    onSymbol?: (value: symbol) => string;
    onFunction?: (value: Function) => string;
    onUndefined?: string;
    onBigInt?: (value: bigint) => string;
};
export type Json = JsonObject | JsonArray;
export interface JsonObject {
    [k: string]: JsonData;
}
export type JsonArray = JsonData[];
export type JsonPrimitive = string | boolean | number | null;
export type JsonData = Json | JsonPrimitive;
export declare const snapshot: <t>(data: t, opts?: SerializationOptions) => snapshot<t>;
export type snapshot<t, depth extends 1[] = []> = unknown extends t ? unknown : t extends Primitive ? snapshotPrimitive<t> : t extends {
    toJSON: () => infer serialized;
} ? serialized : t extends Function ? `Function(${string})` : t extends Date ? string : depth["length"] extends 10 ? unknown : t extends array<infer item> ? array<snapshot<item, [...depth, 1]>> : {
    [k in keyof t as snapshotPrimitive<k>]: snapshot<t[k], [...depth, 1]>;
};
type snapshotPrimitive<t> = t extends symbol ? `Symbol(${string})` : t;
export declare const print: (data: unknown, indent?: number) => void;
export declare const printable: (data: unknown, indent?: number) => string;
/**
 * Converts a Date instance to a human-readable description relative to its precision
 *
 * @param {Date} date
 * @returns {string} - The generated description
 */
export declare const describeCollapsibleDate: (date: Date) => string;
export {};
