import { type Json, type Key, type SerializedPrimitive, type array, type show } from "@ark/util";
import type { NodeSchema, RootSchema, nodeOfKind } from "../kinds.js";
import { type NodeCompiler } from "../shared/compile.js";
import type { BaseErrorContext, BaseNormalizedSchema, declareNode } from "../shared/declare.js";
import { Disjoint } from "../shared/disjoint.js";
import type { ArkError } from "../shared/errors.js";
import { type IntersectionContext, type RootKind, type UnionChildKind, type nodeImplementationOf } from "../shared/implement.js";
import type { JsonSchema } from "../shared/jsonSchema.js";
import { type RegisteredReference } from "../shared/registry.js";
import type { TraverseAllows, TraverseApply } from "../shared/traversal.js";
import type { Domain } from "./domain.js";
import { BaseRoot } from "./root.js";
export declare namespace Union {
    type ChildKind = UnionChildKind;
    type ChildSchema = NodeSchema<ChildKind>;
    type ChildNode = nodeOfKind<ChildKind>;
    type Schema = NormalizedSchema | readonly RootSchema[];
    interface NormalizedSchema extends BaseNormalizedSchema {
        readonly branches: array<RootSchema>;
        readonly ordered?: true;
    }
    interface Inner {
        readonly branches: readonly ChildNode[];
        readonly ordered?: true;
    }
    interface ErrorContext extends BaseErrorContext<"union"> {
        errors: readonly ArkError[];
    }
    interface Declaration extends declareNode<{
        kind: "union";
        schema: Schema;
        normalizedSchema: NormalizedSchema;
        inner: Inner;
        errorContext: ErrorContext;
        reducibleTo: RootKind;
        childKind: UnionChildKind;
    }> {
    }
    type Node = UnionNode;
}
export declare class UnionNode extends BaseRoot<Union.Declaration> {
    isBoolean: boolean;
    get branchGroups(): BaseRoot[];
    unitBranches: (import("./morph.js").MorphNode | import("./unit.js").UnitNode)[];
    discriminant: Discriminant<DiscriminantKind> | null;
    discriminantJson: Json | null;
    expression: string;
    get shortDescription(): string;
    protected innerToJsonSchema(): JsonSchema;
    traverseAllows: TraverseAllows;
    traverseApply: TraverseApply;
    compile(js: NodeCompiler): void;
    private compileIndiscriminable;
    get nestableExpression(): string;
    discriminate(): Discriminant | null;
}
export declare const Union: {
    implementation: nodeImplementationOf<Union.Declaration>;
    Node: typeof UnionNode;
};
export declare const intersectBranches: (l: readonly Union.ChildNode[], r: readonly Union.ChildNode[], ctx: IntersectionContext) => readonly Union.ChildNode[] | Disjoint;
export declare const reduceBranches: ({ branches, ordered }: Union.Inner) => readonly Union.ChildNode[];
export type CaseKey<kind extends DiscriminantKind = DiscriminantKind> = DiscriminantKind extends kind ? string : DiscriminantKinds[kind] | "default";
type DiscriminantContext<kind extends DiscriminantKind = DiscriminantKind> = {
    path: Key[];
    optionallyChainedPropString: string;
    kind: kind;
};
export interface Discriminant<kind extends DiscriminantKind = DiscriminantKind> extends DiscriminantContext<kind> {
    cases: DiscriminatedCases<kind>;
}
export type DiscriminatedCases<kind extends DiscriminantKind = DiscriminantKind> = {
    [caseKey in CaseKey<kind>]: BaseRoot | true;
};
export type DiscriminantKinds = {
    domain: Domain;
    unit: SerializedPrimitive | RegisteredReference;
};
export type DiscriminantKind = show<keyof DiscriminantKinds>;
export declare const pruneDiscriminant: (discriminantBranch: BaseRoot, discriminantCtx: DiscriminantContext) => BaseRoot | null;
export declare const writeIndiscriminableMorphMessage: (lDescription: string, rDescription: string) => string;
export declare const writeOrderedIntersectionMessage: (lDescription: string, rDescription: string) => string;
export {};
