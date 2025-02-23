import type { array } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/arrays.js";
import type { domainOf } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/domain.js";
import type { andPreserveUnknown } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/generics.js";
import type { Hkt } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/hkt.js";
import type { propValueOf, requiredKeyOf } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/records.js";
export interface AndPreserveUnknown extends Hkt<[unknown, unknown]> {
    body: andPreserveUnknown<this[0], this[1]>;
}
type SequenceIntersectionKind = "array" | "parameters";
export type intersectArrays<l extends array, r extends array, operator extends Hkt = AndPreserveUnknown> = intersectSequences<l, r, [], [], operator, "array">;
export type intersectParameters<l extends array, r extends array, operator extends Hkt = AndPreserveUnknown> = intersectSequences<l, r, [], [], operator, "parameters">;
type intersectSequences<l extends array, r extends array, acc extends array, postfix extends array, operation extends Hkt, kind extends SequenceIntersectionKind> = l extends readonly [] ? kind extends "array" ? [
] extends r ? [
    ...acc,
    ...postfix
] : never : [...acc, ...r, ...postfix] : r extends readonly [] ? kind extends "array" ? [
] extends l ? [
    ...acc,
    ...postfix
] : never : [...acc, ...l, ...postfix] : [l, r] extends ([
    readonly [(infer lHead)?, ...infer lTail],
    readonly [(infer rHead)?, ...infer rTail]
]) ? [
    "0",
    lHead,
    rHead
] extends [keyof l | keyof r, l[0], r[0]] ? intersectSequences<lTail, rTail, [
    [],
    []
] extends [l, r] ? [
    ...acc,
    Hkt.apply<operation, [lHead, rHead]>?
] : [...acc, Hkt.apply<operation, [lHead, rHead]>], postfix, operation, kind> : l extends readonly [...infer lInit, infer lLast] ? r extends readonly [...infer rInit, infer rLast] ? intersectSequences<lInit, rInit, acc, [
    Hkt.apply<operation, [lLast, rLast]>,
    ...postfix
], operation, kind> : intersectSequences<lInit, r, acc, [
    Hkt.apply<operation, [lLast, r[number]]>,
    ...postfix
], operation, kind> : r extends readonly [...infer rInit, infer rLast] ? intersectSequences<l, rInit, acc, [
    Hkt.apply<operation, [l[number], rLast]>,
    ...postfix
], operation, kind> : [...acc, ...Hkt.apply<operation, [lHead, rHead]>[], ...postfix] : never;
export type isDisjoint<l, r> = overlaps<l, r> extends true ? false : true;
export type overlaps<l, r> = l & r extends never ? false : domainOf<l> & domainOf<r> extends never ? false : [l, r] extends [object, object] ? false extends (propValueOf<{
    [k in Extract<keyof l & keyof r, requiredKeyOf<l> | requiredKeyOf<r>>]: overlaps<l[k], r[k]>;
}>) ? false : true : true;
export {};
