import { type array, type satisfy } from "@ark/util";
import { BaseConstraint } from "../constraint.js";
import type { RootSchema } from "../kinds.js";
import { type BaseNode, type DeepNodeTransformContext, type DeepNodeTransformation, type FlatRef } from "../node.js";
import type { ExactLengthNode } from "../refinements/exactLength.js";
import type { MaxLengthNode } from "../refinements/maxLength.js";
import type { MinLengthNode } from "../refinements/minLength.js";
import type { BaseRoot } from "../roots/root.js";
import type { NodeCompiler } from "../shared/compile.js";
import type { BaseNormalizedSchema, declareNode } from "../shared/declare.js";
import { type RootKind, type nodeImplementationOf } from "../shared/implement.js";
import { type JsonSchema } from "../shared/jsonSchema.js";
import { type TraverseAllows, type TraverseApply } from "../shared/traversal.js";
export declare namespace Sequence {
    interface NormalizedSchema extends BaseNormalizedSchema {
        readonly prefix?: array<RootSchema>;
        readonly optionals?: array<RootSchema>;
        readonly variadic?: RootSchema;
        readonly minVariadicLength?: number;
        readonly postfix?: array<RootSchema>;
    }
    type Schema = NormalizedSchema | RootSchema;
    interface Inner {
        readonly prefix?: array<BaseRoot>;
        readonly optionals?: array<BaseRoot>;
        readonly variadic?: BaseRoot;
        readonly minVariadicLength?: number;
        readonly postfix?: array<BaseRoot>;
    }
    interface Declaration extends declareNode<{
        kind: "sequence";
        schema: Schema;
        normalizedSchema: NormalizedSchema;
        inner: Inner;
        prerequisite: array;
        reducibleTo: "sequence";
        childKind: RootKind;
    }> {
    }
    type Node = SequenceNode;
}
export declare class SequenceNode extends BaseConstraint<Sequence.Declaration> {
    impliedBasis: BaseRoot;
    prefixLength: number;
    optionalsLength: number;
    postfixLength: number;
    prevariadic: array<BaseRoot>;
    variadicOrPostfix: array<BaseRoot>;
    isVariadicOnly: boolean;
    minVariadicLength: number;
    minLength: number;
    minLengthNode: MinLengthNode | null;
    maxLength: number | null;
    maxLengthNode: MaxLengthNode | ExactLengthNode | null;
    impliedSiblings: array<MaxLengthNode | MinLengthNode | ExactLengthNode>;
    protected childAtIndex(data: array, index: number): BaseRoot;
    traverseAllows: TraverseAllows<array>;
    traverseApply: TraverseApply<array>;
    get flatRefs(): FlatRef[];
    get element(): BaseRoot;
    compile(js: NodeCompiler): void;
    protected _transform(mapper: DeepNodeTransformation, ctx: DeepNodeTransformContext): BaseNode | null;
    tuple: SequenceTuple;
    expression: string;
    reduceJsonSchema(schema: JsonSchema.Array): JsonSchema.Array;
}
export declare const Sequence: {
    implementation: nodeImplementationOf<Sequence.Declaration>;
    Node: typeof SequenceNode;
};
export declare const postfixFollowingOptionalMessage = "A postfix required element cannot follow an optional element";
export type postfixFollowingOptionalMessage = typeof postfixFollowingOptionalMessage;
export declare const postfixWithoutVariadicMessage = "A postfix element requires a variadic element";
export type postfixWithoutVariadicMessage = typeof postfixWithoutVariadicMessage;
export type SequenceElementKind = satisfy<keyof Sequence.Inner, "prefix" | "optionals" | "variadic" | "postfix">;
export type SequenceElement = {
    kind: SequenceElementKind;
    node: BaseRoot;
};
export type SequenceTuple = array<SequenceElement>;
