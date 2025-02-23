import { type Entry, type Json, type JsonData, type KeySet, type arrayIndexOf, type keySetOf, type listable, type requireKeys, type show } from "@ark/util";
import type { NodeConfig, ResolvedUnknownNodeConfig } from ".pnpm/@ark+schema@0.26.0/node_modules/@ark/schema/config";
import type { Declaration, Inner, errorContext, nodeOfKind } from "../kinds.js";
import type { BaseNode } from "../node.js";
import type { NodeId, NodeParseContext } from "../parse.js";
import type { BaseRoot, schemaKindOrRightOf, schemaKindRightOf } from "../roots/root.js";
import type { BaseScope } from "../scope.js";
import type { Structure } from "../structure/structure.js";
import type { BaseErrorContext, BaseMeta, BaseNodeDeclaration, BaseNormalizedSchema } from "./declare.js";
import type { Disjoint } from "./disjoint.js";
import { type makeRootAndArrayPropertiesMutable } from "./utils.js";
export declare const basisKinds: readonly ["unit", "proto", "domain"];
export type BasisKind = (typeof basisKinds)[number];
export declare const structuralKinds: readonly ["required", "optional", "index", "sequence"];
export type StructuralKind = (typeof structuralKinds)[number];
export type RangeKind = Exclude<BoundKind, "exactLength">;
export type BoundKind = Exclude<RefinementKind, "pattern" | "divisor">;
export declare const refinementKinds: readonly ["pattern", "divisor", "exactLength", "max", "min", "maxLength", "minLength", "before", "after"];
export type RefinementKind = (typeof refinementKinds)[number];
type orderedConstraintKinds = [
    ...typeof refinementKinds,
    ...typeof structuralKinds,
    "structure",
    "predicate"
];
export declare const constraintKinds: orderedConstraintKinds;
export type ConstraintKind = (typeof constraintKinds)[number];
export declare const rootKinds: readonly ["alias", "union", "morph", "unit", "intersection", "proto", "domain"];
export type RootKind = (typeof rootKinds)[number];
export type NodeKind = RootKind | ConstraintKind;
type orderedNodeKinds = [...typeof rootKinds, ...typeof constraintKinds];
export declare const nodeKinds: orderedNodeKinds;
export type OpenNodeKind = {
    [k in NodeKind]: Declaration<k>["intersectionIsOpen"] extends true ? k : never;
}[NodeKind];
export type ClosedNodeKind = Exclude<NodeKind, OpenNodeKind>;
export type PrimitiveKind = RefinementKind | BasisKind | "predicate";
export type CompositeKind = Exclude<NodeKind, PrimitiveKind>;
export type OrderedNodeKinds = typeof nodeKinds;
export declare const constraintKeys: KeySet<ConstraintKind>;
export declare const structureKeys: keySetOf<Structure.Inner>;
type RightsByKind = accumulateRightKinds<OrderedNodeKinds, {}>;
export type kindOrRightOf<kind extends NodeKind> = kind | kindRightOf<kind>;
export type kindLeftOf<kind extends NodeKind> = Exclude<NodeKind, kindOrRightOf<kind>>;
export type kindOrLeftOf<kind extends NodeKind> = kind | kindLeftOf<kind>;
type accumulateRightKinds<remaining extends readonly NodeKind[], result> = remaining extends (readonly [infer head extends NodeKind, ...infer tail extends NodeKind[]]) ? accumulateRightKinds<tail, result & {
    [k in head]: tail[number];
}> : result;
export interface InternalIntersectionOptions {
    pipe: boolean;
}
export interface IntersectionContext extends InternalIntersectionOptions {
    $: BaseScope;
    invert: boolean;
}
export type ConstraintIntersection<lKind extends ConstraintKind, rKind extends kindOrRightOf<lKind>> = (l: nodeOfKind<lKind>, r: nodeOfKind<rKind>, ctx: IntersectionContext) => BaseNode | Disjoint | null;
export type ConstraintIntersectionMap<kind extends ConstraintKind> = show<{
    [_ in kind]: ConstraintIntersection<kind, kind>;
} & {
    [rKind in kindRightOf<kind>]?: ConstraintIntersection<kind, rKind>;
}>;
export type RootIntersection<lKind extends RootKind, rKind extends schemaKindOrRightOf<lKind>> = (l: nodeOfKind<lKind>, r: nodeOfKind<rKind>, ctx: IntersectionContext) => BaseRoot | Disjoint;
export type TypeIntersectionMap<kind extends RootKind> = {
    [rKind in schemaKindOrRightOf<kind>]: RootIntersection<kind, rKind>;
};
export type IntersectionMap<kind extends NodeKind> = kind extends RootKind ? TypeIntersectionMap<kind> : ConstraintIntersectionMap<kind & ConstraintKind>;
export type UnknownIntersectionMap = {
    [k in NodeKind]?: (l: BaseNode, r: BaseNode, ctx: IntersectionContext) => UnknownIntersectionResult;
};
export type UnknownIntersectionResult = BaseNode | Disjoint | null;
type PrecedenceByKind = {
    [i in arrayIndexOf<OrderedNodeKinds> as OrderedNodeKinds[i]]: i;
};
export declare const precedenceByKind: PrecedenceByKind;
export declare const isNodeKind: (value: unknown) => value is NodeKind;
export declare function assertNodeKind<kind extends NodeKind>(value: BaseNode, kind: kind): asserts value is nodeOfKind<kind>;
export type precedenceOfKind<kind extends NodeKind> = PrecedenceByKind[kind];
export declare const precedenceOfKind: <kind extends NodeKind>(kind: kind) => precedenceOfKind<kind>;
export type kindRightOf<kind extends NodeKind> = RightsByKind[kind];
export declare const schemaKindsRightOf: <kind extends RootKind>(kind: kind) => schemaKindRightOf<kind>[];
export declare const unionChildKinds: readonly [...("morph" | "unit" | "intersection" | "proto" | "domain")[], "alias"];
export type UnionChildKind = (typeof unionChildKinds)[number];
export declare const morphChildKinds: readonly [...("unit" | "intersection" | "proto" | "domain")[], "alias"];
export type MorphChildKind = (typeof morphChildKinds)[number];
export type keySchemaDefinitions<d extends BaseNodeDeclaration> = {
    [k in keyRequiringSchemaDefinition<d>]: NodeKeyImplementation<d, k>;
};
type keyRequiringSchemaDefinition<d extends BaseNodeDeclaration> = Exclude<keyof d["normalizedSchema"], keyof BaseNormalizedSchema>;
export declare const defaultValueSerializer: (v: unknown) => JsonData;
export type NodeKeyImplementation<d extends BaseNodeDeclaration, k extends keyof d["normalizedSchema"], instantiated = k extends keyof d["inner"] ? Exclude<d["inner"][k], undefined> : never> = requireKeys<{
    preserveUndefined?: true;
    child?: boolean;
    serialize?: (schema: instantiated) => JsonData;
    reduceIo?: (ioKind: "in" | "out", inner: makeRootAndArrayPropertiesMutable<d["inner"]>, value: d["inner"][k]) => void;
    parse?: (schema: Exclude<d["normalizedSchema"][k], undefined>, ctx: NodeParseContext<d["kind"]>) => instantiated | undefined;
}, (d["normalizedSchema"][k] extends instantiated | undefined ? never : "parse") | ([instantiated] extends [listable<BaseNode>] ? "child" : never)>;
interface CommonNodeImplementationInput<d extends BaseNodeDeclaration> {
    kind: d["kind"];
    keys: keySchemaDefinitions<d>;
    normalize: (schema: d["schema"], $: BaseScope) => d["normalizedSchema"];
    hasAssociatedError: d["errorContext"] extends null ? false : true;
    finalizeInnerJson?: (json: {
        [k in keyof d["inner"]]: JsonData;
    }) => Json;
    collapsibleKey?: keyof d["inner"];
    reduce?: (inner: d["inner"], $: BaseScope) => nodeOfKind<d["reducibleTo"]> | Disjoint | undefined;
}
export interface UnknownNodeImplementation extends CommonNodeImplementationInput<BaseNodeDeclaration> {
    defaults: ResolvedUnknownNodeConfig;
    intersectionIsOpen: boolean;
    intersections: UnknownIntersectionMap;
    keys: Record<string, NodeKeyImplementation<any, any>>;
}
export declare const compileErrorContext: (ctx: object) => string;
export type nodeImplementationOf<d extends BaseNodeDeclaration> = nodeImplementationInputOf<d> & {
    intersections: IntersectionMap<d["kind"]>;
    intersectionIsOpen: d["intersectionIsOpen"];
    defaults: Required<NodeConfig<d["kind"]>>;
};
export type nodeImplementationInputOf<d extends BaseNodeDeclaration> = CommonNodeImplementationInput<d> & {
    intersections: IntersectionMap<d["kind"]>;
    defaults: nodeSchemaaultsImplementationInputFor<d["kind"]>;
} & (d["intersectionIsOpen"] extends true ? {
    intersectionIsOpen: true;
} : {}) & (d["reducibleTo"] extends d["kind"] ? {} : {
    reduce: {};
});
type nodeSchemaaultsImplementationInputFor<kind extends NodeKind> = requireKeys<NodeConfig<kind>, "description" | (Inner<kind> extends (Omit<errorContext<kind>, keyof BaseErrorContext | "description">) ? never : "expected" & keyof NodeConfig<kind>)>;
export type DescriptionWriter<kind extends NodeKind = NodeKind> = (node: nodeOfKind<kind>) => string;
export interface UnknownAttachments {
    alias?: string;
    readonly kind: NodeKind;
    readonly impl: UnknownNodeImplementation;
    readonly id: NodeId;
    readonly inner: Record<string, any>;
    readonly innerEntries: readonly Entry<string>[];
    readonly innerJson: object;
    readonly innerHash: string;
    readonly meta: BaseMeta;
    readonly metaJson: object;
    readonly json: object;
    readonly hash: string;
    readonly collapsibleJson: JsonData;
    readonly children: BaseNode[];
}
export interface NarrowedAttachments<d extends BaseNodeDeclaration> extends UnknownAttachments {
    kind: d["kind"];
    inner: d["inner"];
    json: Json;
    innerJson: Json;
    collapsibleJson: JsonData;
    children: nodeOfKind<d["childKind"]>[];
}
export declare const implementNode: <d extends BaseNodeDeclaration = never>(_: nodeImplementationInputOf<d>) => nodeImplementationOf<d>;
export {};
