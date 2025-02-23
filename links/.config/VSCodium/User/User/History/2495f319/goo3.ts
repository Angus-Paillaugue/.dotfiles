import { ArkErrors, BaseRoot, type BaseParseOptions, type MetaSchema, type Morph, type Predicate, type RootSchema } from "@ark/schema";
import { Callable, Hkt, type Constructor, type array, type conform } from "@ark/util";
import type { DefaultFor, distill } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { Generic, GenericParser, ParameterString, baseGenericConstraints, parseValidGenericParams, validateParameterString } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/generic.ts";
import type { Ark, keywords, type } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/keywords.ts";
import type { BaseType } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/methods/base.ts";
import type { instantiateType } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/methods/instantiate.ts";
import type { validateDeclared, validateDefinition } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/definition.ts";
import type { IndexOneOperator, IndexZeroOperator, TupleInfixOperator } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/tuple.ts";
import type { InternalScope, ModuleParser, Scope, ScopeParser, bindThis } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/scope.ts";
/** The convenience properties attached to `type` */
export type TypeParserAttachments = Omit<TypeParser, never>;
export interface TypeParser<$ = {}> extends Ark.boundTypeAttachments<$> {
    <const def, r = Type<type.infer<def, $>, $>>(def: type.validate<def, $>): r;
    <const params extends ParameterString, const def>(params: validateParameterString<params, $>, def: validateDefinition<def, $, baseGenericConstraints<parseValidGenericParams<params, $>>>): Generic<parseValidGenericParams<params, $>, def, $>;
    <const zero, const one, const rest extends array, r = Type<type.infer<[zero, one, ...rest], $>, $>>(_0: zero extends IndexZeroOperator ? zero : type.validate<zero, $>, _1: zero extends "keyof" ? type.validate<one, $> : zero extends "instanceof" ? conform<one, Constructor> : zero extends "===" ? conform<one, unknown> : conform<one, IndexOneOperator>, ..._2: zero extends "===" ? rest : zero extends "instanceof" ? conform<rest, readonly Constructor[]> : one extends TupleInfixOperator ? one extends ":" ? [Predicate<distill.In<type.infer<zero, $>>>] : one extends "=>" ? [Morph<distill.Out<type.infer<zero, $>>, unknown>] : one extends "@" ? [MetaSchema] : one extends "=" ? [DefaultFor<distill.In<type.infer<NoInfer<zero>, $>>>] : [type.validate<rest[0], $>] : []): r;
    /**
     * Error class for validation errors
     * Calling type instance returns an instance of this class on failure
     * @example if ( T(data) instanceof type.errors ) { ... }
     */
    errors: typeof ArkErrors;
    hkt: typeof Hkt;
    keywords: typeof keywords;
    $: Scope<$>;
    raw(def: unknown): BaseType<any, $>;
    module: ModuleParser;
    scope: ScopeParser;
    define: DefinitionParser<$>;
    generic: GenericParser<$>;
    schema: SchemaParser<$>;
    /**
     * Create a `Type` that is satisfied only by a value strictly equal (`===`) to the argument passed to this function.
     * @example const foo = type.unit('foo') // Type<'foo'>
     * @example const sym: unique symbol = Symbol(); type.unit(sym) // Type<typeof sym>
     */
    unit: UnitTypeParser<$>;
    /**
     * Create a `Type` that is satisfied only by a value strictly equal (`===`) to one of the arguments passed to this function.
     * @example const enum = type.enumerated('foo', 'bar', obj) // obj is a by-reference object
     * @example const tupleForm = type(['===', 'foo', 'bar', obj])
     * @example const argsForm = type('===', 'foo', 'bar', obj)
     */
    enumerated: EnumeratedTypeParser<$>;
    /**
     * Create a `Type` that is satisfied only by a value of a specific class.
     * @example const array = type.instanceOf(Array)
     */
    instanceOf: InstanceOfTypeParser<$>;
}
export declare class InternalTypeParser extends Callable<(...args: unknown[]) => BaseRoot | Generic, TypeParserAttachments> {
    constructor($: InternalScope);
}
export type DeclarationParser<$> = <preinferred>() => {
    type: <const def>(def: validateDeclared<preinferred, def, $, bindThis<def>>) => Type<preinferred, $>;
};
export type UnitTypeParser<$> = <const t>(value: t) => Type<t, $>;
export type InstanceOfTypeParser<$> = <const t extends object>(ctor: Constructor<t>) => Type<t, $>;
export type EnumeratedTypeParser<$> = <const values extends readonly unknown[]>(...values: values) => Type<values[number], $>;
export type DefinitionParser<$> = <const def>(def: type.validate<def, $>) => def;
export type SchemaParser<$> = (schema: RootSchema, opts?: BaseParseOptions) => Type<unknown, $>;
export type Type<t = unknown, $ = {}> = instantiateType<t, $>;
export type TypeConstructor<t = unknown, $ = {}> = new (def: unknown, $: Scope<$>) => Type<t, $>;
export declare const Type: TypeConstructor;
