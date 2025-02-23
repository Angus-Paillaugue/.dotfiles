import { type BaseParseContext, type BaseRoot, type Index, type Optional, type Required, type UndeclaredKeyBehavior, type writeInvalidPropertyKeyMessage } from "@ark/schema";
import { type anyOrNever, type Dict, type ErrorMessage, type ErrorType, type EscapeChar, type Key, type listable, type merge, type show } from "@ark/util";
import type { of } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { astToString } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/ast/utils.ts";
import type { validateString } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/ast/validate.ts";
import type { inferDefinition, validateDefinition } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/definition.ts";
export declare const parseObjectLiteral: (def: Dict, ctx: BaseParseContext) => BaseRoot;
export declare const writeInvalidUndeclaredBehaviorMessage: (actual: unknown) => string;
export declare const nonLeadingSpreadError = "Spread operator may only be used as the first key in an object";
export type inferObjectLiteral<def extends object, $, args> = show<"..." extends keyof def ? merge<inferDefinition<def["..."], $, args>, _inferObjectLiteral<def, $, args>> : _inferObjectLiteral<def, $, args>>;
/**
 * Infers the contents of an object literal, ignoring a spread definition
 */
type _inferObjectLiteral<def extends object, $, args> = {
    -readonly [k in keyof def as nonOptionalKeyFrom<k, $, args>]: [
        def[k]
    ] extends [anyOrNever] ? def[k] : inferDefinition<def[k], $, args>;
} & {
    -readonly [k in keyof def as optionalKeyFrom<k>]?: inferDefinition<def[k], $, args>;
};
export type validateObjectLiteral<def, $, args> = {
    [k in keyof def]: k extends IndexKey<infer indexDef> ? validateString<indexDef, $, args> extends ErrorMessage<infer message> ? ErrorType<message> : inferDefinition<indexDef, $, args> extends Key | of<Key, {}> ? validateDefinition<def[k], $, args> : ErrorType<writeInvalidPropertyKeyMessage<indexDef>> : k extends "..." ? inferDefinition<def[k], $, args> extends object ? validateDefinition<def[k], $, args> : ErrorType<writeInvalidSpreadTypeMessage<astToString<def[k]>>> : k extends "+" ? UndeclaredKeyBehavior : validateDefinition<def[k], $, args>;
};
type nonOptionalKeyFrom<k, $, args> = parseKey<k> extends PreparsedKey<"required", infer inner> ? inner : parseKey<k> extends PreparsedKey<"index", infer inner> ? inferDefinition<inner, $, args> extends infer t extends Key ? t : never : never;
type optionalKeyFrom<k> = parseKey<k> extends PreparsedKey<"optional", infer inner> ? inner : never;
export type PreparsedKey<kind extends ParsedKeyKind = ParsedKeyKind, key extends Key = Key> = {
    kind: kind;
    key: key;
};
declare namespace PreparsedKey {
    type from<t extends PreparsedKey> = t;
}
type ParsedKeyKind = "required" | "optional" | "index" | MetaKey;
export type MetaKey = "..." | "+";
export type IndexKey<def extends string = string> = `[${def}]`;
export type ParsedEntry = ParsedUndeclaredEntry | ParsedSpreadEntry | Required.Node | Optional.Node | Index.Node;
export type ParsedUndeclaredEntry = {
    kind: "undeclared";
    behavior: UndeclaredKeyBehavior;
};
export type ParsedSpreadEntry = {
    kind: "spread";
    node: BaseRoot;
};
export declare const parseEntry: (key: Key, value: unknown, ctx: BaseParseContext) => listable<ParsedEntry>;
declare const parseKey: (key: Key) => PreparsedKey;
type parseKey<k> = k extends `${infer inner}?` ? inner extends `${infer baseName}${EscapeChar}` ? PreparsedKey.from<{
    kind: "required";
    key: `${baseName}?`;
}> : PreparsedKey.from<{
    kind: "optional";
    key: inner;
}> : k extends MetaKey ? PreparsedKey.from<{
    kind: k;
    key: k;
}> : k extends `${EscapeChar}${infer escapedMeta extends MetaKey}` ? PreparsedKey.from<{
    kind: "required";
    key: escapedMeta;
}> : k extends IndexKey<infer def> ? PreparsedKey.from<{
    kind: "index";
    key: def;
}> : PreparsedKey.from<{
    kind: "required";
    key: k extends `${EscapeChar}${infer escapedIndexKey extends IndexKey}` ? escapedIndexKey : k extends Key ? k : `${k & number}`;
}>;
export declare const writeInvalidSpreadTypeMessage: <def extends string>(def: def) => writeInvalidSpreadTypeMessage<def>;
type writeInvalidSpreadTypeMessage<def extends string> = `Spread operand must resolve to an object literal type (was ${def})`;
export {};
