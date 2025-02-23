import { BaseConstraint } from "./constraint.js";
import type { NodeCompiler } from "./shared/compile.js";
import type { BaseErrorContext, BaseNormalizedSchema, declareNode } from "./shared/declare.js";
import { type nodeImplementationOf } from "./shared/implement.js";
import { type RegisteredReference } from "./shared/registry.js";
import type { TraversalContext, TraverseAllows, TraverseApply } from "./shared/traversal.js";
export declare namespace Predicate {
    type Schema<predicate extends Predicate = Predicate> = NormalizedSchema<predicate> | predicate;
    interface NormalizedSchema<predicate extends Predicate = Predicate> extends BaseNormalizedSchema {
        readonly predicate: predicate;
    }
    interface Inner<predicate extends Predicate = Predicate> {
        readonly predicate: predicate;
    }
    interface ErrorContext extends BaseErrorContext<"predicate"> {
        readonly predicate?: Predicate;
    }
    interface Declaration extends declareNode<{
        kind: "predicate";
        schema: Schema;
        normalizedSchema: NormalizedSchema;
        inner: Inner;
        intersectionIsOpen: true;
        errorContext: ErrorContext;
    }> {
    }
    type Node = PredicateNode;
}
export declare class PredicateNode extends BaseConstraint<Predicate.Declaration> {
    serializedPredicate: RegisteredReference;
    compiledCondition: string;
    compiledNegation: string;
    impliedBasis: null;
    expression: string;
    traverseAllows: TraverseAllows;
    errorContext: Predicate.ErrorContext;
    compiledErrorContext: string;
    traverseApply: TraverseApply;
    compile(js: NodeCompiler): void;
    reduceJsonSchema(): never;
}
export declare const Predicate: {
    implementation: nodeImplementationOf<Predicate.Declaration>;
    Node: typeof PredicateNode;
};
export type Predicate<data = any> = (data: data, ctx: TraversalContext) => boolean;
export type PredicateCast<input = never, narrowed extends input = input> = (input: input, ctx: TraversalContext) => input is narrowed;
