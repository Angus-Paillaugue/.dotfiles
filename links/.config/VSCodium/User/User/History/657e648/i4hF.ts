import type { array, listable } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/arrays.js";
import type { show } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/generics.js";
import type { Key } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/keys.js";
import type { Entry, entryOf, fromEntries } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/records.js";
import type { intersectUnion } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/unionToTuple.js";
type objectFromListableEntries<transformed extends readonly Entry[]> = show<intersectUnion<fromEntries<transformed>>>;
type arrayFromListableEntries<transformed extends Entry> = Entry<number, never> extends transformed ? transformed[1][] : _arrayFromListableEntries<transformed, []>;
type _arrayFromListableEntries<transformed extends Entry, result extends unknown[]> = [
    transformed
] extends [never] ? result : Extract<transformed, Entry<result["length"]>> extends (infer next extends Entry) ? Exclude<transformed, next> extends infer remaining extends Entry ? [
    transformed
] extends [remaining] ? [
    ...result,
    ...transformed[1][]
] : _arrayFromListableEntries<remaining, [...result, next[1]]> : never : [...result, ...transformed[1][]];
type extractEntrySets<e extends listable<Entry>> = e extends readonly Entry[] ? e : [e];
type extractEntries<e extends listable<Entry>> = e extends readonly Entry[] ? e[number] : e;
type entryArgsWithIndex<o> = {
    [k in keyof o]-?: [k: k, v: Exclude<o[k], undefined>, i: number];
}[keyof o];
type numericArrayEntry<a extends array> = number extends a["length"] ? [number, a[number]] : {
    [i in keyof a]: i extends `${infer n extends number}` ? [n, a[i]] : never;
}[number];
export type MappedEntry = listable<Entry<Key> | Entry<number>>;
export type fromMappedEntries<transformed extends MappedEntry> = [
    transformed
] extends [listable<Entry<number>>] ? arrayFromListableEntries<extractEntries<transformed>> : objectFromListableEntries<extractEntrySets<transformed>>;
export type FlatMorph = {
    <const o extends array, transformed extends MappedEntry>(o: o, flatMapEntry: (...args: numericArrayEntry<o>) => transformed): fromMappedEntries<transformed>;
    <const o extends object, transformed extends MappedEntry>(o: o, flatMapEntry: (...args: entryOf<o>) => transformed): fromMappedEntries<transformed>;
    <const o extends object, transformed extends MappedEntry>(o: o, flatMapEntry: (...args: entryArgsWithIndex<o>) => transformed): fromMappedEntries<transformed>;
};
export declare const flatMorph: FlatMorph;
export {};
