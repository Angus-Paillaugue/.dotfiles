import { type array, type listable } from "@ark/util";
import type { RootSchema } from "../kinds.js";
import type { NodeCompiler } from "../shared/compile.js";
import type { BaseNormalizedSchema, declareNode } from "../shared/declare.js";
import { type nodeImplementationOf, type RootKind } from "../shared/implement.js";
import { type JsonSchema } from "../shared/jsonSchema.js";
import type { TraversalContext, TraverseAllows, TraverseApply } from "../shared/traversal.js";
import { BaseRoot } from "./root.js";
export declare namespace Morph {
    interface Inner {
        readonly in?: BaseRoot;
        readonly morphs: array<Morph | BaseRoot>;
        readonly declaredIn?: BaseRoot;
        readonly declaredOut?: BaseRoot;
    }
    interface Schema extends BaseNormalizedSchema {
        readonly in?: RootSchema;
        readonly morphs: listable<Morph | BaseRoot>;
        readonly declaredIn?: BaseRoot;
        readonly declaredOut?: BaseRoot;
    }
    interface Declaration extends declareNode<{
        kind: "morph";
        schema: Schema;
        normalizedSchema: Schema;
        inner: Inner;
        childKind: RootKind;
    }> {
    }
    type Node = MorphNode;
}
export type Morph<i = any, o = unknown> = (In: i, ctx: TraversalContext) => o;
export declare class MorphNode extends BaseRoot<Morph.Declaration> {
    serializedMorphs: string[];
    compiledMorphs: string;
    lastMorph: BaseRoot<import("./root.js").InternalRootDeclaration> | Morph<any, unknown> | undefined;
    lastMorphIfNode: BaseRoot | undefined;
    introspectableIn: BaseRoot | undefined;
    introspectableOut: BaseRoot | undefined;
    get in(): BaseRoot;
    get out(): BaseRoot;
    declareIn(declaredIn: BaseRoot): MorphNode;
    declareOut(declaredOut: BaseRoot): MorphNode;
    expression: string;
    get shortDescription(): string;
    protected innerToJsonSchema(): JsonSchema;
    compile(js: NodeCompiler): void;
    traverseAllows: TraverseAllows;
    traverseApply: TraverseApply;
    /** Check if the morphs of r are equal to those of this node */
    hasEqualMorphs(r: MorphNode): boolean;
}
export declare const Morph: {
    implementation: nodeImplementationOf<Morph.Declaration>;
    Node: typeof MorphNode;
};
export declare const writeMorphIntersectionMessage: (lDescription: string, rDescription: string) => string;
