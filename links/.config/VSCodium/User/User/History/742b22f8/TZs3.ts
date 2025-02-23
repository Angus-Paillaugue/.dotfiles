import { type BaseParseContext, type BaseRoot } from "@ark/schema";
import { type ErrorMessage, type Fn, type Primitive, type anyOrNever, type array, type defined, type equals, type ifEmptyObjectLiteral, type objectKindOrDomainOf, type optionalKeyOf, type requiredKeyOf, type show } from "@ark/util";
import type { type } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/keywords.ts";
import type { string } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/string/string.ts";
import type { validateString } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/ast/validate.ts";
import { type inferObjectLiteral, type validateObjectLiteral } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/objectLiteral.ts";
import type { BaseCompletions, inferString } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/string.ts";
import { type TupleExpression, type inferTuple, type validateTuple } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/tuple.ts";
export declare const parseObject: (def: object, ctx: BaseParseContext) => BaseRoot;
export type inferDefinition<def, $, args> = [
    def
] extends [anyOrNever] ? def : def extends type.cast<infer t> ? ifEmptyObjectLiteral<def, object, t> : def extends ThunkCast<infer t> ? t : def extends string ? inferString<def, $, args> : def extends array ? inferTuple<def, $, args> : def extends RegExp ? string.matching<string> : def extends object ? inferObjectLiteral<def, $, args> : never;
export type validateDefinition<def, $, args> = null extends undefined ? ErrorMessage<`'strict' or 'strictNullChecks' must be set to true in your tsconfig's 'compilerOptions'`> : [def] extends [Terminal] ? def : def extends string ? validateString<def, $, args> : def extends array ? validateTuple<def, $, args> : def extends BadDefinitionType ? ErrorMessage<writeBadDefinitionTypeMessage<objectKindOrDomainOf<def>>> : unknown extends def ? BaseCompletions<$, args> | {} : RegExp extends def ? def : validateObjectLiteral<def, $, args>;
export type validateDeclared<declared, def, $, args> = def extends validateDefinition<def, $, args> ? validateInference<def, declared, $, args> : validateDefinition<def, $, args>;
type validateInference<def, declared, $, args> = def extends RegExp | type.cast<unknown> | ThunkCast | TupleExpression ? validateShallowInference<def, declared, $, args> : def extends array ? declared extends array ? {
    [i in keyof declared]: i extends keyof def ? validateInference<def[i], declared[i], $, args> : declared[i];
} : show<declarationMismatch<def, declared, $, args>> : def extends object ? show<{
    [k in requiredKeyOf<declared>]: k extends keyof def ? validateInference<def[k], declared[k], $, args> : declared[k];
} & {
    [k in optionalKeyOf<declared> & string as `${k}?`]: `${k}?` extends (keyof def) ? validateInference<def[`${k}?`], defined<declared[k]>, $, args> : declared[k];
}> : validateShallowInference<def, declared, $, args>;
type validateShallowInference<def, declared, $, args> = equals<inferDefinition<def, $, args>, declared> extends true ? def : show<declarationMismatch<def, declared, $, args>>;
type declarationMismatch<def, declared, $, args> = {
    declared: declared;
    inferred: inferDefinition<def, $, args>;
};
type Terminal = type.cast<unknown> | Fn;
export type ThunkCast<t = unknown> = () => type.cast<t>;
type BadDefinitionType = Exclude<Primitive, string>;
export declare const writeBadDefinitionTypeMessage: <actual extends string>(actual: actual) => writeBadDefinitionTypeMessage<actual>;
type writeBadDefinitionTypeMessage<actual extends string> = `Type definitions must be strings or objects (was ${actual})`;
export {};
