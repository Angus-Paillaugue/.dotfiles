import { type array, type listable, type show } from "@ark/util";
import type { nodeOfKind, NodeSchema, Prerequisite, RootSchema } from "../kinds.js";
import type { PredicateNode } from "../predicate.js";
import type { NodeCompiler } from "../shared/compile.js";
import type { BaseErrorContext, BaseNormalizedSchema, declareNode } from "../shared/declare.js";
import type { ArkError } from "../shared/errors.js";
import { type ConstraintKind, type nodeImplementationOf, type OpenNodeKind, type RefinementKind, type StructuralKind } from "../shared/implement.js";
import type { JsonSchema } from "../shared/jsonSchema.js";
import type { TraverseAllows, TraverseApply } from "../shared/traversal.js";
import { type makeRootAndArrayPropertiesMutable } from "../shared/utils.js";
import type { Structure, UndeclaredKeyBehavior } from "../structure/structure.js";
import type { Domain } from "./domain.js";
import type { Proto } from "./proto.js";
import { BaseRoot } from "./root.js";
export declare namespace Intersection {
    type BasisKind = "domain" | "proto";
    type ChildKind = BasisKind | RefinementKind | "predicate" | "structure";
    type FlattenedChildKind = ChildKind | StructuralKind;
    type RefinementsInner = {
        [k in RefinementKind]?: intersectionChildInnerValueOf<k>;
    };
    interface Inner extends RefinementsInner {
        domain?: Domain.Node;
        proto?: Proto.Node;
        structure?: Structure.Node;
        predicate?: array<PredicateNode>;
    }
    namespace Inner {
        type mutable = makeRootAndArrayPropertiesMutable<Inner>;
    }
    type ConstraintsSchema<inferredBasis = any> = show<BaseNormalizedSchema & {
        domain?: Domain.Schema;
        proto?: Proto.Schema;
    } & conditionalRootOf<inferredBasis>>;
    type NormalizedSchema = Omit<ConstraintsSchema, StructuralKind | "undeclared">;
    type Schema<inferredBasis = any> = ConstraintsSchema<inferredBasis>;
    interface AstSchema extends BaseNormalizedSchema {
        intersection: readonly RootSchema[];
    }
    interface ErrorContext extends BaseErrorContext<"intersection">, Inner {
        errors: readonly ArkError[];
    }
    type Declaration = declareNode<{
        kind: "intersection";
        schema: Schema;
        normalizedSchema: NormalizedSchema;
        inner: Inner;
        reducibleTo: "intersection" | BasisKind;
        errorContext: ErrorContext;
        childKind: ChildKind;
    }>;
    type Node = IntersectionNode;
}
export declare class IntersectionNode extends BaseRoot<Intersection.Declaration> {
    basis: nodeOfKind<Intersection.BasisKind> | null;
    refinements: array<nodeOfKind<RefinementKind>>;
    get expression(): string;
    get shortDescription(): string;
    protected innerToJsonSchema(): JsonSchema;
    traverseAllows: TraverseAllows;
    traverseApply: TraverseApply;
    compile(js: NodeCompiler): void;
}
export declare const Intersection: {
    implementation: nodeImplementationOf<{
        intersectionIsOpen: false;
        prerequisite: unknown;
        kind: "intersection";
        schema: Intersection.Schema;
        normalizedSchema: Intersection.NormalizedSchema;
        inner: Intersection.Inner;
        reducibleTo: "intersection" | Intersection.BasisKind;
        errorContext: Intersection.ErrorContext;
        childKind: Intersection.ChildKind;
    }>;
    Node: typeof IntersectionNode;
};
export type ConditionalTerminalIntersectionRoot = {
    undeclared?: UndeclaredKeyBehavior;
};
type ConditionalTerminalIntersectionKey = keyof ConditionalTerminalIntersectionRoot;
type ConditionalIntersectionKey = ConstraintKind | ConditionalTerminalIntersectionKey;
export type constraintKindOf<t> = {
    [k in ConstraintKind]: t extends Prerequisite<k> ? k : never;
}[ConstraintKind];
type conditionalIntersectionKeyOf<t> = constraintKindOf<t> | (t extends object ? "undeclared" : never);
type intersectionChildSchemaValueOf<k extends Intersection.FlattenedChildKind> = k extends OpenNodeKind ? listable<NodeSchema<k>> : NodeSchema<k>;
type conditionalSchemaValueOfKey<k extends ConditionalIntersectionKey> = k extends Intersection.FlattenedChildKind ? intersectionChildSchemaValueOf<k> : ConditionalTerminalIntersectionRoot[k & ConditionalTerminalIntersectionKey];
type intersectionChildInnerValueOf<k extends Intersection.FlattenedChildKind> = k extends OpenNodeKind ? readonly nodeOfKind<k>[] : nodeOfKind<k>;
export type conditionalRootOf<t> = {
    [k in conditionalIntersectionKeyOf<t>]?: conditionalSchemaValueOfKey<k>;
};
export {};
