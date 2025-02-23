import type { keyNonimal } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/generics.js";
export declare class InternalArktypeError extends Error {
}
export declare const throwInternalError: (message: string) => never;
export declare const throwError: (message: string, ctor?: new (message: string) => Error) => never;
export declare class ParseError extends Error {
    name: string;
}
export declare const throwParseError: (message: string) => never;
/**
 *  TypeScript won't suggest strings beginning with a space as properties.
 *  Useful for symbol-like string properties.
 */
export declare const noSuggest: <s extends string>(s: s) => noSuggest<s>;
/**
 *  TypeScript won't suggest strings beginning with a space as properties.
 *  Useful for symbol-like string properties.
 */
export type noSuggest<s extends string = string> = ` ${s}`;
/** "Hair Space" character, used  as a non-rendered sentinel for an error message string:
 *  https://www.compart.com/en/unicode/U+200A
 */
export declare const zeroWidthSpace = "\u200A";
/** "Hair Space" character, used  as a non-rendered sentinel for an error message string:
 *  https://www.compart.com/en/unicode/U+200A
 */
export type ZeroWidthSpace = typeof zeroWidthSpace;
export type ErrorMessage<message extends string = string> = `${message}${ZeroWidthSpace}`;
export interface ErrorType<message extends string = string, ctx extends {} = {}> {
    [keyNonimal]: "ErrorObject";
    message: message;
    ctx: ctx;
}
export type Completion<text extends string = string> = `${text}${ZeroWidthSpace}${ZeroWidthSpace}`;
