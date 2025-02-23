import { BaseScope, type AliasDefEntry, type ArkScopeConfig, type BaseNode, type BaseParseContext, type BaseParseContextInput, type BaseParseOptions, type BaseRoot, type GenericAst, type GenericParamAst, type GenericParamDef, type NodeKind, type NodeSchema, type PreparsedNodeResolution, type PrivateDeclaration, type RootKind, type RootSchema, type arkKind, type exportedNameOf, type nodeOfKind, type reducibleKindOf, type toInternalScope, type writeDuplicateAliasError } from "@ark/schema";
import { type ErrorType, type Json, type anyOrNever, type array, type flattenListable, type noSuggest, type nominal } from "@ark/util";
import type { ArkSchemaRegistry } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/config";
import { type GenericDeclaration, type GenericParser, type ParameterString, type baseGenericConstraints, type parseGenericParams, type parseValidGenericParams } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/generic.ts";
import type { Ark, type } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/keywords.ts";
import type { BoundModule, Module, Submodule, instantiateExport } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/module.ts";
import type { DefAst, InferredAst } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/ast/infer.ts";
import { type inferDefinition, type validateDefinition } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/definition.ts";
import { InternalTypeParser, type DeclarationParser, type DefinitionParser, type EnumeratedTypeParser, type InstanceOfTypeParser, type SchemaParser, type TypeParser, type UnitTypeParser } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/type.ts";
/** The convenience properties attached to `scope` */
export type ScopeParserAttachments = Omit<ScopeParser, never>;
export interface ScopeParser {
    <const def>(def: scope.validate<def>, config?: ArkScopeConfig): Scope<scope.infer<def>>;
    define: <const def>(def: scope.validate<def>) => def;
}
export type ModuleParser = <const def>(def: scope.validate<def>, config?: ArkScopeConfig) => scope.infer<def> extends infer $ ? Module<{
    [k in exportedNameOf<$>]: $[k];
}> : never;
export type bindThis<def> = {
    this: Def<def>;
};
/** nominal type for an unparsed definition used during scope bootstrapping */
type Def<def = {}> = nominal<def, "unparsed">;
/** sentinel indicating a scope that will be associated with a generic has not yet been parsed */
export type UnparsedScope = "$";
/** These are legal as values of a scope but not as definitions in other contexts */
type PreparsedResolution = PreparsedNodeResolution;
type bootstrapAliases<def> = {
    [k in Exclude<keyof def, GenericDeclaration>]: def[k] extends (PreparsedResolution) ? def[k] extends {
        t: infer g extends GenericAst;
    } ? g : def[k] extends Module<infer $> | BoundModule<infer $, any> ? Submodule<$> : def[k] : def[k] extends (() => infer thunkReturn extends PreparsedResolution) ? thunkReturn extends {
        t: infer g extends GenericAst;
    } ? g : thunkReturn extends Module<infer $> | BoundModule<infer $, any> ? Submodule<$> : thunkReturn : Def<def[k]>;
} & {
    [k in keyof def & GenericDeclaration as extractGenericName<k>]: GenericAst<parseValidGenericParams<extractGenericParameters<k>, bootstrapAliases<def>>, def[k], UnparsedScope>;
};
type inferBootstrapped<$> = {
    [name in keyof $]: $[name] extends Def<infer def> ? inferDefinition<def, $, {}> : $[name] extends {
        t: infer g extends GenericAst;
    } ? bindGenericToScope<g, $> : $[name];
} & unknown;
export type bindGenericToScope<g extends GenericAst, $> = GenericAst<g["paramsAst"], g["bodyDef"], g["$"] extends UnparsedScope ? $ : g["$"], $>;
type extractGenericName<k> = k extends GenericDeclaration<infer name> ? name : never;
type extractGenericParameters<k> = k extends `${string}<${infer params}>` ? ParameterString<params> : never;
export type resolutionToAst<alias extends string, resolution> = [
    resolution
] extends [anyOrNever] ? InferredAst<resolution, alias> : resolution extends Def<infer def> ? DefAst<def, alias> : resolution extends {
    [arkKind]: "module";
    root: infer root;
} ? InferredAst<root, alias> : resolution extends GenericAst ? resolution : InferredAst<resolution, alias>;
export type moduleKeyOf<$> = {
    [k in keyof $]: $[k] extends {
        [arkKind]: "module";
    } ? [
        $[k]
    ] extends [anyOrNever] ? never : k & string : never;
}[keyof $];
export interface ArkTypeRegistry extends ArkSchemaRegistry {
    typeAttachments?: Ark.boundTypeAttachments<any>;
}
export declare const $arkTypeRegistry: ArkTypeRegistry;
export interface InternalScope {
    constructor: typeof InternalScope;
}
export declare class InternalScope<$ extends {} = {}> extends BaseScope<$> {
    private parseCache;
    protected cacheGetter<name extends keyof this>(name: name, value: this[name]): this[name];
    get ambientAttachments(): Ark.boundTypeAttachments<$> | undefined;
    protected preparseOwnAliasEntry(k: string, v: unknown): AliasDefEntry;
    parseGenericParams(def: string, opts: BaseParseOptions): array<GenericParamDef>;
    protected normalizeRootScopeValue(resolution: unknown): unknown;
    protected preparseOwnDefinitionFormat(def: unknown, opts: BaseParseOptions): BaseRoot | BaseParseContextInput;
    parseOwnDefinitionFormat(def: unknown, ctx: BaseParseContext): BaseRoot;
    parseString(def: string, ctx: BaseParseContext): BaseRoot;
    unit: UnitTypeParser<$>;
    enumerated: EnumeratedTypeParser<$>;
    instanceOf: InstanceOfTypeParser<$>;
    type: InternalTypeParser;
    declare: () => {
        type: InternalTypeParser;
    };
    define: (def: unknown) => unknown;
    static scope: ScopeParser;
    static module: ModuleParser;
}
export declare const scope: ScopeParser;
export declare namespace scope {
    type validate<def> = {
        [k in keyof def]: k extends noSuggest ? unknown : parseScopeKey<k, def>["params"] extends infer params ? params extends array<GenericParamAst> ? params["length"] extends 0 ? def[k] extends type.Any | PreparsedResolution ? def[k] : k extends (PrivateDeclaration<infer name extends keyof def & string>) ? ErrorType<writeDuplicateAliasError<name>> : validateDefinition<def[k], bootstrapAliases<def>, {}> : validateDefinition<def[k], bootstrapAliases<def>, baseGenericConstraints<params>> : params : never;
    };
    type infer<def> = inferBootstrapped<bootstrapAliases<def>>;
}
export declare const module: ModuleParser;
export interface Scope<$ = {}> {
    t: $;
    [arkKind]: "scope";
    config: ArkScopeConfig;
    references: readonly BaseNode[];
    json: Json;
    exportedNames: array<exportedNameOf<$>>;
    /** The set of names defined at the root-level of the scope mapped to their
     * corresponding definitions.**/
    aliases: Record<string, unknown>;
    internal: toInternalScope<$>;
    defineSchema<const def extends RootSchema>(schema: def): def;
    node<kinds extends NodeKind | array<RootKind>>(kinds: kinds, schema: NodeSchema<flattenListable<kinds>>, opts?: BaseParseOptions): nodeOfKind<reducibleKindOf<flattenListable<kinds>>>;
    unit: UnitTypeParser<$>;
    enumerated: EnumeratedTypeParser<$>;
    type: TypeParser<$>;
    declare: DeclarationParser<$>;
    define: DefinitionParser<$>;
    generic: GenericParser<$>;
    schema: SchemaParser<$>;
    import(): Module<{
        [k in exportedNameOf<$> as PrivateDeclaration<k>]: $[k];
    }>;
    import<names extends exportedNameOf<$>[]>(...names: names): BoundModule<{
        [k in names[number] as PrivateDeclaration<k>]: $[k];
    } & unknown, $>;
    export(): Module<{
        [k in exportedNameOf<$>]: $[k];
    }>;
    export<names extends exportedNameOf<$>[]>(...names: names): BoundModule<{
        [k in names[number]]: $[k];
    } & unknown, $>;
    resolve<name extends exportedNameOf<$>>(name: name): instantiateExport<$[name], $>;
}
export interface ScopeConstructor {
    new <$ = {}>(...args: ConstructorParameters<typeof InternalScope>): Scope<$>;
    scope: ScopeParser;
    module: ModuleParser;
}
export declare const Scope: ScopeConstructor;
export type parseScopeKey<k, def> = k extends `${infer name}<${infer params}>` ? parseGenericScopeKey<name, params, def> : {
    name: k;
    params: [];
};
type parseGenericScopeKey<name extends string, params extends string, def> = {
    name: name;
    params: parseGenericParams<params, bootstrapAliases<def>>;
};
export {};
