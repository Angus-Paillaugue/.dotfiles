import { type BaseParseContext, type BaseRoot, type MetaSchema, type Morph, type Predicate } from "@ark/schema";
import { type anyOrNever, type array, type BuiltinObjectKind, type conform, type Constructor, type Domain, type ErrorMessage, type show, type Thunk } from "@ark/util";
import type { associateAttributes, Default, DefaultFor, distill, inferIntersection, inferMorphOut, inferPredicate, InferredOptional, Optional, Out } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { type } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/keywords.ts";
import type { PostfixExpression } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/ast/infer.ts";
import type { inferDefinition, validateDefinition } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/definition.ts";
import { writeMissingRightOperandMessage } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/shift/operand/unenclosed.ts";
import type { ArkTypeScanner } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/shift/scanner.ts";
import type { BaseCompletions } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/string.ts";
export declare const parseTuple: (def: array, ctx: BaseParseContext) => BaseRoot;
export declare const parseTupleLiteral: (def: array, ctx: BaseParseContext) => BaseRoot;
type InfixExpression = readonly [
    unknown,
    ArkTypeScanner.InfixToken,
    ...unknown[]
];
export type validateTuple<def extends array, $, args> = def extends IndexZeroExpression ? validatePrefixExpression<def, $, args> : def extends PostfixExpression ? validatePostfixExpression<def, $, args> : def extends InfixExpression ? validateInfixExpression<def, $, args> : def extends (readonly ["", ...unknown[]] | readonly [unknown, "", ...unknown[]]) ? readonly [
    def[0] extends "" ? BaseCompletions<$, args, IndexZeroOperator | "..."> : def[0],
    def[1] extends "" ? BaseCompletions<$, args, IndexOneOperator | "..."> : def[1]
] : validateTupleLiteral<def, $, args>;
export type validateTupleLiteral<def extends array, $, args> = parseSequence<def, $, args> extends infer s extends SequenceParseState ? Readonly<s["validated"]> : never;
type inferTupleLiteral<def extends array, $, args> = parseSequence<def, $, args> extends infer s extends SequenceParseState ? s["inferred"] : never;
type SequenceParseState = {
    unscanned: array;
    inferred: array;
    validated: array;
    includesOptional: boolean;
};
type parseSequence<def extends array, $, args> = parseNextElement<{
    unscanned: def;
    inferred: [];
    validated: [];
    includesOptional: false;
}, $, args>;
type PreparsedElement = {
    head: unknown;
    tail: array;
    inferred: unknown;
    optional: boolean;
    spread: boolean;
};
declare namespace PreparsedElement {
    type from<result extends PreparsedElement> = result;
}
type preparseNextElement<s extends SequenceParseState, $, args> = s["unscanned"] extends readonly ["...", infer head, ...infer tail] ? inferDefinition<head, $, args> extends infer t ? [
    t
] extends [anyOrNever] ? PreparsedElement.from<{
    head: head;
    tail: tail;
    inferred: t;
    optional: false;
    spread: true;
}> : [t] extends [InferredOptional<infer base>] ? PreparsedElement.from<{
    head: head;
    tail: tail;
    inferred: base;
    optional: true;
    spread: true;
}> : PreparsedElement.from<{
    head: head;
    tail: tail;
    inferred: t;
    optional: false;
    spread: true;
}> : never : s["unscanned"] extends readonly [infer head, ...infer tail] ? inferDefinition<head, $, args> extends infer t ? [
    t
] extends [anyOrNever] ? PreparsedElement.from<{
    head: head;
    tail: tail;
    inferred: t;
    optional: false;
    spread: false;
}> : [t] extends [InferredOptional<infer base>] ? PreparsedElement.from<{
    head: head;
    tail: tail;
    inferred: base;
    optional: true;
    spread: false;
}> : PreparsedElement.from<{
    head: head;
    tail: tail;
    inferred: t;
    optional: false;
    spread: false;
}> : never : null;
type parseNextElement<s extends SequenceParseState, $, args> = preparseNextElement<s, $, args> extends infer next extends PreparsedElement ? parseNextElement<{
    unscanned: next["tail"];
    inferred: next["spread"] extends true ? [
        ...s["inferred"],
        ...conform<next["inferred"], array>
    ] : next["optional"] extends true ? [...s["inferred"], next["inferred"]?] : [...s["inferred"], next["inferred"]];
    validated: [
        ...s["validated"],
        ...(next["spread"] extends true ? [
            next["inferred"] extends infer spreadOperand extends array ? [
                number,
                number
            ] extends ([
                s["inferred"]["length"],
                spreadOperand["length"]
            ]) ? ErrorMessage<multipleVariadicMessage> : "..." : ErrorMessage<writeNonArraySpreadMessage<next["head"]>>
        ] : []),
        next["optional"] extends true ? next["spread"] extends true ? ErrorMessage<spreadOptionalMessage> : number extends s["inferred"]["length"] ? ErrorMessage<optionalPostVariadicMessage> : validateDefinition<next["head"], $, args> : [s["includesOptional"], next["spread"]] extends [true, false] ? ErrorMessage<requiredPostOptionalMessage> : validateDefinition<next["head"], $, args>
    ];
    includesOptional: s["includesOptional"] | next["optional"] extends (false) ? false : true;
}, $, args> : s;
export declare const writeNonArraySpreadMessage: <operand extends string>(operand: operand) => writeNonArraySpreadMessage<operand>;
type writeNonArraySpreadMessage<operand> = `Spread element must be an array${operand extends string ? ` (was ${operand})` : ""}`;
export declare const multipleVariadicMesage = "A tuple may have at most one variadic element";
type multipleVariadicMessage = typeof multipleVariadicMesage;
export declare const requiredPostOptionalMessage = "A required element may not follow an optional element";
type requiredPostOptionalMessage = typeof requiredPostOptionalMessage;
export declare const optionalPostVariadicMessage = "An optional element may not follow a variadic element";
type optionalPostVariadicMessage = typeof optionalPostVariadicMessage;
export declare const spreadOptionalMessage = "A spread element cannot be optional";
type spreadOptionalMessage = typeof optionalPostVariadicMessage;
export type inferTuple<def extends array, $, args> = def extends TupleExpression ? inferTupleExpression<def, $, args> : inferTupleLiteral<def, $, args>;
export type inferTupleExpression<def extends TupleExpression, $, args> = def[1] extends "[]" ? inferDefinition<def[0], $, args>[] : def[1] extends "&" ? inferIntersection<inferDefinition<def[0], $, args>, inferDefinition<def[2], $, args>> : def[1] extends "|" ? inferDefinition<def[0], $, args> | inferDefinition<def[2], $, args> : def[1] extends ":" ? inferPredicate<inferDefinition<def[0], $, args>, def[2]> : def[1] extends "=>" ? parseMorph<def[0], def[2], $, args> : def[1] extends "@" ? inferDefinition<def[0], $, args> : def[1] extends "=" ? associateAttributes<inferDefinition<def[0], $, args>, Default<def[2] extends Thunk<infer returnValue> ? returnValue : def[2]>> : def[1] extends "?" ? associateAttributes<inferDefinition<def[0], $, args>, Optional> : def extends readonly ["===", ...infer values] ? values[number] : def extends (readonly ["instanceof", ...infer constructors extends Constructor[]]) ? InstanceType<constructors[number]> : def[0] extends "keyof" ? inferKeyOfExpression<def[1], $, args> : never;
export type validatePrefixExpression<def extends IndexZeroExpression, $, args> = def["length"] extends 1 ? readonly [writeMissingRightOperandMessage<def[0]>] : def[0] extends "keyof" ? readonly [def[0], validateDefinition<def[1], $, args>] : def[0] extends "===" ? readonly [def[0], ...unknown[]] : def[0] extends "instanceof" ? readonly [def[0], ...Constructor[]] : never;
export type validatePostfixExpression<def extends PostfixExpression, $, args> = conform<def, readonly [validateDefinition<def[0], $, args>, "[]" | "?"]>;
export type validateInfixExpression<def extends InfixExpression, $, args> = def["length"] extends 2 ? readonly [def[0], writeMissingRightOperandMessage<def[1]>] : readonly [
    validateDefinition<def[0], $, args>,
    def[1],
    def[1] extends "|" ? validateDefinition<def[2], $, args> : def[1] extends "&" ? validateDefinition<def[2], $, args> : def[1] extends ":" ? Predicate<type.infer.Out<def[0], $, args>> : def[1] extends "=>" ? Morph<type.infer.Out<def[0], $, args>> : def[1] extends "@" ? MetaSchema : def[1] extends "=" ? DefaultFor<type.infer.In<def[0], $, args>> : validateDefinition<def[2], $, args>
];
export type UnparsedTupleExpressionInput = {
    instanceof: Constructor;
    "===": unknown;
};
export type UnparsedTupleOperator = show<keyof UnparsedTupleExpressionInput>;
export declare const parseKeyOfTuple: PrefixParser<"keyof">;
export type inferKeyOfExpression<operandDef, $, args> = show<keyof inferDefinition<operandDef, $, args>>;
export type IndexOneParser<token extends IndexOneOperator> = (def: IndexOneExpression<token>, ctx: BaseParseContext) => BaseRoot;
export type PrefixParser<token extends IndexZeroOperator> = (def: IndexZeroExpression<token>, ctx: BaseParseContext) => BaseRoot;
export type TupleExpression = IndexZeroExpression | IndexOneExpression;
export type TupleExpressionOperator = IndexZeroOperator | IndexOneOperator;
export type IndexOneOperator = TuplePostfixOperator | TupleInfixOperator;
export type TuplePostfixOperator = "[]" | "?";
export type TupleInfixOperator = "&" | "|" | "=>" | ":" | "@" | "=";
export type IndexOneExpression<token extends IndexOneOperator = IndexOneOperator> = readonly [unknown, token, ...unknown[]];
export declare const parseMorphTuple: IndexOneParser<"=>">;
export declare const writeMalformedFunctionalExpressionMessage: (operator: ":" | "=>", value: unknown) => string;
export type parseMorph<inDef, morph, $, args> = morph extends Morph ? inferMorphOut<morph> extends infer out ? (In: distill.withAttributes.In<inferDefinition<inDef, $, args>>) => Out<out> : never : never;
export declare const parseNarrowTuple: IndexOneParser<":">;
export type IndexZeroOperator = "keyof" | "instanceof" | "===";
export type IndexZeroExpression<token extends IndexZeroOperator = IndexZeroOperator> = readonly [token, ...unknown[]];
export declare const writeInvalidConstructorMessage: <actual extends Domain | BuiltinObjectKind>(actual: actual) => string;
export {};
