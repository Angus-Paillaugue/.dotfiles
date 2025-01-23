import type { arkKind, GenericParamAst, PrivateDeclaration, writeMissingSubmoduleAccessMessage, writeUnsatisfiedParameterConstraintMessage } from "@ark/schema";
import type { anyOrNever, array, BigintLiteral, Completion, ErrorMessage, NumberLiteral, typeToString, writeMalformedNumericLiteralMessage } from "@ark/util";
import type { Generic } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/generic.ts";
import type { Comparator } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/reduce/shared.ts";
import type { writeInvalidGenericArgCountMessage } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/shift/operand/genericArgs.ts";
import type { UnitLiteral } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/shift/operator/default.ts";
import type { parseString } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/string.ts";
import type { validateRange } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/ast/bounds.ts";
import type { validateDefault } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/ast/default.ts";
import type { validateDivisor } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/ast/divisor.ts";
import type { DefAst, GenericInstantiationAst, inferAstRoot, InferredAst, InfixExpression, PostfixExpression } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/ast/infer.ts";
import type { validateKeyof } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/ast/keyof.ts";
import type { astToString } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/ast/utils.ts";
export type validateAst<ast, $, args> = ast extends ErrorMessage ? ast : ast extends InferredAst ? validateInferredAst<ast[0], ast[2]> : ast extends DefAst ? ast[2] extends PrivateDeclaration<infer name> ? ErrorMessage<writePrefixedPrivateReferenceMessage<name>> : undefined : ast extends PostfixExpression<infer operator, infer operand> ? operator extends "[]" ? validateAst<operand, $, args> : operator extends "?" ? validateAst<operand, $, args> : never : ast extends InfixExpression<infer operator, infer l, infer r> ? operator extends "&" | "|" ? validateInfix<ast, $, args> : operator extends Comparator ? validateRange<l, operator, r, $, args> : operator extends "%" ? validateDivisor<l, $, args> : operator extends "=" ? validateDefault<l, r & UnitLiteral, $, args> : operator extends "#" ? validateAst<l, $, args> : ErrorMessage<writeUnexpectedExpressionMessage<astToString<ast>>> : ast extends ["keyof", infer operand] ? validateKeyof<operand, $, args> : ast extends GenericInstantiationAst<infer g, infer argAsts> ? validateGenericArgs<g["paramsAst"], argAsts, $, args, []> : ErrorMessage<writeUnexpectedExpressionMessage<astToString<ast>>> & {
    ast: ast;
};
type writeUnexpectedExpressionMessage<expression extends string> = `Unexpectedly failed to parse the expression resulting from ${expression}`;
type validateGenericArgs<params extends array<GenericParamAst>, argAsts extends array, $, args, indices extends 1[]> = argAsts extends readonly [infer arg, ...infer argsTail] ? validateAst<arg, $, args> extends infer e extends ErrorMessage ? e : inferAstRoot<arg, $, args> extends params[indices["length"]][1] ? validateGenericArgs<params, argsTail, $, args, [...indices, 1]> : ErrorMessage<writeUnsatisfiedParameterConstraintMessage<params[indices["length"]][0], typeToString<params[indices["length"]][1]>, astToString<arg>>> : undefined;
export declare const writePrefixedPrivateReferenceMessage: <name extends string>(name: name) => writePrefixedPrivateReferenceMessage<name>;
export type writePrefixedPrivateReferenceMessage<name extends string> = `Private type references should not include '#'. Use '${name}' instead.`;
type validateInferredAst<inferred, def extends string> = def extends NumberLiteral ? number extends inferred ? ErrorMessage<writeMalformedNumericLiteralMessage<def, "number">> : undefined : def extends BigintLiteral ? bigint extends inferred ? ErrorMessage<writeMalformedNumericLiteralMessage<def, "bigint">> : undefined : [inferred] extends [anyOrNever] ? undefined : def extends PrivateDeclaration<infer name> ? ErrorMessage<writePrefixedPrivateReferenceMessage<name>> : inferred extends Generic ? ErrorMessage<writeInvalidGenericArgCountMessage<def, inferred["names"], []>> : inferred extends {
    [arkKind]: "module";
} ? "root" extends keyof inferred ? undefined : ErrorMessage<writeMissingSubmoduleAccessMessage<def>> : def extends ErrorMessage ? def : undefined;
export type validateString<def extends string, $, args> = validateAst<parseString<def, $, args>, $, args> extends (infer result extends ErrorMessage) ? result extends Completion<infer text> ? text : result : def;
type validateInfix<ast extends InfixExpression, $, args> = validateAst<ast[0], $, args> extends infer e extends ErrorMessage ? e : validateAst<ast[2], $, args> extends infer e extends ErrorMessage ? e : undefined;
export {};
