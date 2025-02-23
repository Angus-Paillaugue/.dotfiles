import type { GuardablePredicate } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/functions.js";
import type { anyOrNever, conform } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/generics.js";
import type { isDisjoint } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/intersections.js";
import type { parseNonNegativeInteger } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/numbers.js";
export type pathToString<segments extends string[], delimiter extends string = "/"> = segments extends [] ? "/" : join<segments, delimiter>;
export declare const join: <segments extends array<string>, delimiter extends string>(segments: segments, delimiter: delimiter) => join<segments, delimiter>;
export type join<segments extends array<string>, delimiter extends string, result extends string = ""> = segments extends (readonly [infer head extends string, ...infer tail extends string[]]) ? join<tail, delimiter, result extends "" ? head : `${result}${delimiter}${head}`> : result;
export declare const getPath: (root: unknown, path: string[]) => unknown;
export declare const intersectUniqueLists: <item>(l: readonly item[], r: readonly item[]) => item[];
export type filter<t extends array, constraint, result extends unknown[] = []> = t extends readonly [infer head, ...infer tail] ? filter<tail, constraint, head extends constraint ? [...result, head] : result> : result;
export type array<t = unknown> = readonly t[];
export type listable<t> = t | readonly t[];
export type flattenListable<t> = t extends array<infer element> ? element : t;
export type NonEmptyList<t = unknown> = readonly [t, ...t[]];
export type repeat<t extends array, count extends number> = _repeat<t, [
], count, [
]>;
type _repeat<base extends array, result extends array, maxDepth extends number, depth extends 1[]> = depth["length"] extends maxDepth ? result : _repeat<base, [...result, ...base], maxDepth, [...depth, 1]>;
export type CollapsingList<t = unknown> = readonly [] | t | readonly [t, t, ...t[]];
export type headOf<t extends array> = t[0];
export type tailOf<t extends array> = t extends readonly [unknown, ...infer tail] ? tail : never;
export type lastIndexOf<t extends array> = tailOf<t>["length"];
export type lastOf<t extends array> = t[lastIndexOf<t>];
export type initOf<t extends array> = t extends readonly [...infer init, unknown] ? init : never;
export type numericStringKeyOf<t extends array> = Extract<keyof t, `${number}`>;
export type arrayIndexOf<a extends array> = keyof a extends infer k ? parseNonNegativeInteger<k & string> : never;
export type liftArray<t> = t extends array ? [
    t
] extends [anyOrNever] ? t[] : t : t[];
export declare const liftArray: <t>(data: t) => liftArray<t>;
/**
 * Splits an array into two arrays based on the result of a predicate
 *
 * @param arr - The input array to be split.
 * @param predicate - The guard function used to determine which items to include.
 * @returns A tuple containing two arrays:
 * 				- the first includes items for which `predicate` returns true
 * 				- the second includes items for which `predicate` returns false
 *
 * @example
 * const list = [1, "2", "3", 4, 5];
 * const [numbers, strings] = spliterate(list, (x) => typeof x === "number");
 * // Type: number[]
 * // Output: [1, 4, 5]
 * console.log(evens);
 * // Type: string[]
 * // Output: ["2", "3"]
 * console.log(odds);
 */
export declare const spliterate: <item, included extends item>(arr: readonly item[], predicate: GuardablePredicate<item, included>) => [included: included[], excluded: [item] extends [included] ? item[] : Exclude<item, included>[]];
export declare const ReadonlyArray: new <T>(...args: ConstructorParameters<typeof Array<T>>) => ReadonlyArray<T>;
export declare const includes: <a extends array>(array: a, element: unknown) => element is a[number];
export declare const range: (length: number, offset?: number) => number[];
export type AppendOptions = {
    prepend?: boolean;
};
/**
 * Adds a value or array to an array, returning the concatenated result
 *
 * @param to The array to which `value` is to be added. If `to` is `undefined`, a new array
 * is created as `[value]` if value was not undefined, otherwise `[]`.
 * @param value The value to add to the array.
 * @param opts
 * 		prepend: If true, adds the element to the beginning of the array instead of the end
 */
export declare const append: <to extends unknown[] | undefined, value extends listable<(to & {})[number]>>(to: to, value: value, opts?: AppendOptions) => to & {};
/**
 * Concatenates an element or list with a readonly list
 *
 * @param {to} to - The base list.
 * @param {elementOrList} elementOrList - The element or list to concatenate.
 */
export declare const conflatenate: <element>(to: readonly element[] | undefined | null, elementOrList: listable<element> | undefined | null) => readonly element[];
/**
 * Concatenates a variadic list of elements or lists with a readonly list
 *
 * @param {to} to - The base list.
 * @param {elementsOrLists} elementsOrLists - The elements or lists to concatenate.
 */
export declare const conflatenateAll: <element>(...elementsOrLists: (listable<element> | undefined | null)[]) => readonly element[];
export interface ComparisonOptions<t = unknown> {
    isEqual?: (l: t, r: t) => boolean;
}
/**
 * Appends a value or concatenates an array to an array if it is not already included, returning the array
 *
 * @param to The array to which `value` is to be appended. If `to` is `undefined`, a new array
 * is created including only `value`.
 * @param value An array or value to append to the array. If `to` includes `value`, nothing is appended.
 */
export declare const appendUnique: <to extends unknown[]>(to: to | undefined, value: NoInfer<Readonly<to> | to[number]>, opts?: ComparisonOptions<to[number]>) => to;
export type groupableKeyOf<o> = keyof o extends infer k ? k extends keyof o ? o[k] extends PropertyKey ? k : never : never : never;
export type groupBy<element, discriminant extends groupableKeyOf<element>> = {
    [k in element[discriminant] & PropertyKey]?: (element extends unknown ? isDisjoint<element[discriminant], k> extends true ? never : element : never)[];
} & unknown;
export declare const groupBy: <element, discriminant extends groupableKeyOf<element>>(array: readonly element[], discriminant: discriminant) => groupBy<element, discriminant>;
export declare const arrayEquals: <element>(l: array<element>, r: array<element>, opts?: ComparisonOptions<element>) => boolean;
export type validateExhaustiveKeys<keys extends readonly PropertyKey[], expectedKey extends PropertyKey> = keys extends readonly [infer head, ...infer tail extends PropertyKey[]] ? readonly [
    conform<head, expectedKey>,
    ...validateExhaustiveKeys<tail, Exclude<expectedKey, head>>
] : [expectedKey] extends [never] ? [] : [expectedKey];
export {};
