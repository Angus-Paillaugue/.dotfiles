import type { BaseRoot, resolvableReferenceIn } from "@ark/schema";
import { type ErrorMessage } from "@ark/util";
import type { ArkAmbient } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/config";
import type { resolutionToAst } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/scope.ts";
import type { inferAstRoot } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/ast/infer.ts";
import type { DynamicState, DynamicStateWithRoot } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/reduce/dynamic.ts";
import type { StringifiablePrefixOperator } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/reduce/shared.ts";
import type { state, StaticState } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/reduce/static.ts";
import type { parseOperand } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/shift/operand/operand.ts";
import { parseDefault } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/shift/operator/default.ts";
import { writeUnexpectedCharacterMessage, type parseOperator } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/shift/operator/operator.ts";
/**
 * Try to parse the definition from right to left using the most common syntax.
 * This can be much more efficient for simple definitions.
 */
export type parseString<def extends string, $, args> = def extends keyof $ ? resolutionToAst<def, $[def]> : def extends `${infer child}[]` ? child extends keyof $ ? [
    resolutionToAst<child, $[child]>,
    "[]"
] : fullStringParse<state.initialize<def>, $, args> : fullStringParse<state.initialize<def>, $, args>;
export type inferString<def extends string, $, args> = inferAstRoot<parseString<def, $, args>, $, args>;
export type BaseCompletions<$, args, otherSuggestions extends string = never> = resolvableReferenceIn<$> | resolvableReferenceIn<ArkAmbient.$> | (keyof args & string) | StringifiablePrefixOperator | otherSuggestions;
export declare const fullStringParse: (s: DynamicState) => BaseRoot;
type fullStringParse<s extends StaticState, $, args> = extractFinalizedResult<parseUntilFinalizer<s, $, args>>;
export declare const parseUntilFinalizer: (s: DynamicState) => DynamicStateWithRoot;
export type parseUntilFinalizer<s extends StaticState, $, args> = s["finalizer"] extends undefined ? parseUntilFinalizer<next<s, $, args>, $, args> : s;
declare const next: (s: DynamicState) => void;
type next<s extends StaticState, $, args> = s["root"] extends undefined ? parseOperand<s, $, args> : parseOperator<s, $, args>;
export type extractFinalizedResult<s extends StaticState> = s["finalizer"] extends "" ? s["root"] : s["finalizer"] extends ErrorMessage ? s["finalizer"] : s["finalizer"] extends "?" ? [s["root"], "?"] : s["finalizer"] extends "=" ? parseDefault<s["root"], s["unscanned"]> : state.error<writeUnexpectedCharacterMessage<`${s["finalizer"]}`>>;
export {};
