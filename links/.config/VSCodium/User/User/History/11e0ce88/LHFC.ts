import type { BaseRoot } from "@ark/schema";
import type { BigintLiteral, ErrorMessage, NumberLiteral, trim } from "@ark/util";
import type { DateLiteral } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { DynamicStateWithRoot } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/reduce/dynamic.ts";
import type { StringLiteral } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/shift/operand/enclosed.ts";
type UnitLiteralKeyword = "null" | "undefined" | "true" | "false";
export type UnitLiteral = StringLiteral | BigintLiteral | NumberLiteral | DateLiteral | UnitLiteralKeyword;
export declare const parseDefault: (s: DynamicStateWithRoot) => BaseRoot;
export type parseDefault<root, unscanned extends string> = trim<unscanned> extends infer defaultValue extends UnitLiteral ? [
    root,
    "=",
    defaultValue
] : ErrorMessage<writeNonLiteralDefaultMessage<trim<unscanned>>>;
export declare const writeNonLiteralDefaultMessage: <defaultDef extends string>(defaultDef: defaultDef) => writeNonLiteralDefaultMessage<defaultDef>;
export type writeNonLiteralDefaultMessage<defaultDef extends string> = `Default value '${defaultDef}' must a literal value`;
export {};
