import type { Primitive } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/domain.js";
import { type ErrorMessage } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/errors.js";
import type { unionToTuple } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/unionToTuple.js";
export type Stringifiable = string | boolean | number | bigint | null | undefined;
/** Force an operation like `{ a: 0 } & { b: 1 }` to be computed so that it displays `{ a: 0; b: 1 }`. */
export type show<t> = {
    [k in keyof t]: t[k];
} & unknown;
/** @deprecated use "show" instead */
export type evaluate<t> = {
    [k in keyof t]: t[k];
} & unknown;
export type exact<t extends object, u extends object> = {
    [k in keyof t]: k extends keyof u ? conform<t[k], u[k]> : never;
};
export type exactMessageOnError<t extends object, u extends object> = {
    [k in keyof t]: k extends keyof u ? conform<t[k], u[k]> : ErrorMessage<`'${k & string}' is not a valid key`>;
} & u;
export type promisable<t> = t | Promise<t>;
export type leftIfEqual<l, r> = [l, r] extends [r, l] ? l : r;
export type UnknownUnion = string | number | symbol | bigint | boolean | object | null | undefined;
/**
 * Interesection (`&`) that avoids evaluating `unknown` to `{}`
 */
export type andPreserveUnknown<l, r> = unknown extends l & r ? unknown : show<l & r>;
/** Can be used to test for the universal subtypes, `any` and `never`, e.g.:
 *
 * ```ts
 * type isAnyOrNever<t> = [t] extends [anyOrNever] ? true : false
 * ```
 *
 *  The actual value is a string literal, but the only realistic subtypes
 *  of that literal are `any` and `never`.
 */
export type anyOrNever = " anyOrNever";
export type conform<t, base> = t extends base ? t : base;
export type equals<l, r> = [l, r] extends [r, l] ? true : false;
export type exactEquals<l, r> = (<_>() => _ extends l ? 1 : 2) extends <_>() => _ extends r ? 1 : 2 ? true : false;
/** You can avoid suggesting completions by prefixing a string key with whitespace.
 *  Isn't that keyNominal?
 */
export declare const keyNonimal = " keyNonimal";
export type nominal<t, id extends string> = t & {
    readonly [keyNonimal]: [t, id];
};
export type satisfy<base, t extends base> = t;
export type defined<t> = t & ({} | null);
export type autocomplete<suggestions extends string> = suggestions | (string & {});
export type widen<t, supertypes> = collectWidenedType<t, unionToTuple<supertypes>>;
type collectWidenedType<t, remaining extends unknown[], result = never> = remaining extends [infer head, ...infer tail] ? collectWidenedType<t, tail, t extends head ? result | head : result> : result;
type narrowTuple<t extends readonly unknown[]> = t extends readonly [infer head, ...infer tail] ? readonly [head, ...narrowTuple<tail>] : [];
export type narrow<t> = t extends Primitive ? t : t extends readonly unknown[] ? narrowTuple<t> : {
    [k in keyof t]: narrow<t[k]>;
};
export declare const narrow: <t>(t: narrow<t>) => t;
/** primitive key used to represent an inferred type at compile-time */
export declare const inferred: " arkInferred";
/** primitive key used to represent an inferred type at compile-time */
export type inferred = typeof inferred;
export {};
