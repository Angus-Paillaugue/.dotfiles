import type { array } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/arrays.js";
import type { Fn } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/functions.js";
import type { defined, show } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/generics.js";
import type { Key } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/keys.js";
import type { intersectUnion } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/unionToTuple.js";
export type Dict<k extends string = string, v = unknown> = {
    readonly [_ in k]: v;
};
export type dict<v = unknown, k extends string = string> = {
    [_ in k]: v;
};
/** Either:
 * A, with all properties of B undefined
 * OR
 * B, with all properties of A undefined
 **/
export type propwiseXor<a, b> = show<a & {
    [k in keyof b]?: undefined;
}> | show<b & {
    [k in keyof a]?: undefined;
}>;
export type unionToPropwiseXor<props extends object, branchKey extends PropertyKey = keyof intersectUnion<props>> = props extends infer distributed ? show<distributed & {
    [k in branchKey]?: k extends keyof distributed ? unknown : undefined;
}> : never;
export type requireKeys<o, key extends keyof o> = o & {
    [requiredKey in key]-?: defined<o[requiredKey]>;
};
export type require<o, maxDepth extends number = 1> = _require<o, [], maxDepth>;
type _require<o, depth extends 1[], maxDepth extends number> = depth["length"] extends maxDepth ? o : o extends object ? o extends Fn ? o : {
    [k in keyof o]-?: _require<o[k], [...depth, 1], maxDepth>;
} : o;
export type PartialRecord<k extends PropertyKey = PropertyKey, v = unknown> = {
    [_ in k]?: v;
};
/** Returns true if a type can be homomorphically mapped without losing information.
 * Useful for avoiding e.g. classes with private properties while mapping.
 */
export type isSafelyMappable<t> = {
    [k in keyof t]: t[k];
} extends t ? true : false;
export type KeySet<key extends string = string> = {
    readonly [_ in key]?: 1;
};
export type keySetOf<o extends object> = KeySet<Extract<keyof o, string>>;
export type mutable<o, maxDepth extends number = 1> = _mutable<o, [], maxDepth>;
type _mutable<o, depth extends 1[], maxDepth extends number> = depth["length"] extends maxDepth ? o : o extends object ? o extends Fn ? o : {
    -readonly [k in keyof o]: _mutable<o[k], [...depth, 1], maxDepth>;
} : o;
/**
 * extracts entries mimicking Object.entries, accounting for whether the
 * object is an array
 **/
export type entryOf<o> = {
    [k in keyof o]-?: [k, o[k] & ({} | null)];
}[o extends readonly unknown[] ? keyof o & number : keyof o] & unknown;
export type entriesOf<o extends object> = entryOf<o>[];
/**
 * Object.entries wrapper providing narrowed types for objects with known sets
 * of keys, e.g. those defined internally as configs
 *
 * @param o the object to get narrowed entries from
 * @returns a narrowed array of entries based on that object's type
 */
export declare const entriesOf: <o extends object>(o: o) => entryOf<o>[];
export type Entry<key extends PropertyKey = PropertyKey, value = unknown> = readonly [key: key, value: value];
export type fromEntries<entries extends readonly Entry[]> = show<{
    [entry in entries[number] as entry[0]]: entry[1];
}>;
export declare const fromEntries: <const entries extends readonly Entry[]>(entries: entries) => fromEntries<entries>;
/** Mimics the result of Object.keys(...) */
export type keyOf<o> = o extends array ? number extends o["length"] ? `${number}` : keyof o & `${number}` : keyof o extends infer k ? k extends string ? k : k extends number ? `${k}` : never : never;
export declare const keysOf: <o extends object>(o: o) => keyOf<o>[];
export declare const isKeyOf: <k extends string | number | symbol, o extends object>(k: k, o: o) => k is Extract<keyof o, k>;
/** Coalesce keys that exist on one or more branches of a union */
export type unionKeyOf<t> = t extends unknown ? keyof t : never;
export type extractKeyed<o extends object, k extends unionKeyOf<o>> = Extract<o, {
    [_ in k]?: unknown;
}>;
export declare const hasKey: <o extends object, k extends unionKeyOf<o>>(o: o, k: k) => o is extractKeyed<o, k>;
export type extractDefinedKey<o extends object, k extends unionKeyOf<o>> = show<extractKeyed<o, k> & {
    [_ in k]: {} | null;
}>;
export declare const hasDefinedKey: <o extends object, k extends unionKeyOf<o>>(o: o, k: k) => o is extractDefinedKey<o, k>;
export type requiredKeyOf<o> = keyof o extends infer k ? k extends keyof o ? o extends {
    [_ in k]-?: o[k];
} ? k : never : never : never;
export type optionalKeyOf<o> = Exclude<keyof o, requiredKeyOf<o>>;
export type merge<base, props> = base extends unknown ? props extends unknown ? show<omit<base, keyof props & keyof base> & props> : never : never;
export type mergeExact<base, props> = base extends unknown ? props extends unknown ? show<omitMerged<base, props> & props> : never : never;
type omitMerged<base, props> = {
    [k in keyof base as excludeExactKeyOf<k, props>]: base[k];
};
type excludeExactKeyOf<key extends PropertyKey, o> = Exclude<key, extractExactKeyOf<key, o>>;
type extractExactKeyOf<key extends PropertyKey, base> = keyof {
    [k in keyof base as [key, k] extends [k, key] ? key : never]: 1;
};
export type override<base, merged extends {
    [k in keyof base]?: unknown;
}> = merge<base, merged>;
export type propValueOf<o> = o[keyof o];
export declare const InnerDynamicBase: new <t extends object>(base: t) => t;
/** @ts-ignore (needed to extend `t`) **/
export interface DynamicBase<t extends object> extends t {
}
export declare class DynamicBase<t extends object> {
    constructor(properties: t);
}
export declare const NoopBase: new <t extends object>() => t;
/** @ts-ignore (needed to extend `t`) **/
export declare class CastableBase<t extends object> extends NoopBase<t> {
}
export declare const splitByKeys: <o extends object, leftKeys extends keySetOf<o>>(o: o, leftKeys: leftKeys) => [show<Pick<o, keyof leftKeys & keyof o>>, show<Omit<o, keyof leftKeys & keyof o>>];
/** Homomorphic implementation of the builtin Pick.
 *
 * Gives different results for certain union expressions like the following:
 *
 * @example
 * // flattens result to { a?: 1 | 2; b?: 1 | 2 }
 * type PickResult = Pick<{ a: 1; b?: 1 } | { a?: 2; b: 2 }, "a" | "b">
 *
 * @example
 * // preserves original type w/ modifier groupings
 * type pickResult = pick<{ a: 1; b?: 1 } | { a?: 2; b: 2 }, "a" | "b">
 */
export type pick<o, key extends keyof o> = o extends unknown ? {
    [k in keyof o as k extends key ? k : never]: o[k];
} : never;
export declare const pick: <o extends object, keys extends keySetOf<o>>(o: o, keys: keys) => pick<o, keyof keys & keyof o>;
/** Homomorphic implementation of the builtin Omit.
 *
 * Gives different results for many union expressions like the following:
 *
 * @example
 * // {}
 * type OmitResult = Omit<{ a: 1 } | { b: 2 }, never>
 *
 * @example
 * // preserves original type w/ modifier groupings
 * type omitResult = omit<{ a: 1 } | { b: 2 }, never>
 */
export type omit<o, key extends keyof o> = {
    [k in keyof o as k extends key ? never : k]: o[k];
};
export declare const omit: <o extends object, keys extends keySetOf<o>>(o: o, keys: keys) => omit<o, keyof keys & keyof o>;
/** Returns onTrue if the type is exactly `{}` and onFalse otherwise*/
export type ifEmptyObjectLiteral<t, onTrue = true, onFalse = false> = [
    unknown,
    t & (null | undefined)
] extends [t | null | undefined, never] ? onTrue : onFalse;
export type EmptyObject = Record<PropertyKey, never>;
export declare const isEmptyObject: (o: object) => o is EmptyObject;
export declare const stringAndSymbolicEntriesOf: (o: object) => Entry<Key>[];
/** Like Object.assign, but it will preserve getters instead of evaluating them. */
export declare const defineProperties: <base extends object, merged extends object>(base: base, merged: merged) => merge<base, merged>;
export type invert<t extends Record<PropertyKey, PropertyKey>> = {
    [k in t[keyof t]]: {
        [k2 in keyof t]: t[k2] extends k ? k2 : never;
    }[keyof t];
} & unknown;
export declare const invert: <t extends Record<PropertyKey, PropertyKey>>(t: t) => invert<t>;
export declare const unset: unique symbol;
export type unset = typeof unset;
/**
 *  For each keyof o that also exists on jsDocSource, add associated JsDoc annotations to o.
 *  Does not preserve modifiers on o like optionality.
 */
export type withJsDoc<o, jsDocSource> = show<keyof o extends keyof jsDocSource ? keyof jsDocSource extends keyof o ? _withJsDoc<o, jsDocSource> : Pick<_withJsDoc<o, jsDocSource>, keyof o & keyof jsDocSource> : Pick<_withJsDoc<o, jsDocSource>, keyof o & keyof jsDocSource> & {
    [k in Exclude<keyof o, keyof jsDocSource>]: o[k];
}>;
type _withJsDoc<o, jsDocSource> = {
    [k in keyof jsDocSource]-?: o[k & keyof o];
};
export type propertyDescriptorsOf<o extends object> = {
    [k in keyof o]: TypedPropertyDescriptor<o[k]>;
};
export {};
