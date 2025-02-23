import { InternalPrimitiveConstraint, writeInvalidOperandMessage } from "../constraint.js";
import type { BaseRoot } from "../roots/root.js";
import type { BaseErrorContext, BaseNormalizedSchema, declareNode } from "../shared/declare.js";
import { type nodeImplementationOf } from "../shared/implement.js";
import type { JsonSchema } from "../shared/jsonSchema.js";
import type { TraverseAllows } from "../shared/traversal.js";
export declare namespace Divisor {
    interface Inner {
        readonly rule: number;
    }
    interface NormalizedSchema extends BaseNormalizedSchema {
        readonly rule: number;
    }
    type Schema = NormalizedSchema | number;
    interface ErrorContext extends BaseErrorContext<"divisor">, Inner {
    }
    interface Declaration extends declareNode<{
        kind: "divisor";
        schema: Schema;
        normalizedSchema: NormalizedSchema;
        inner: Inner;
        prerequisite: number;
        errorContext: ErrorContext;
    }> {
    }
    type Node = DivisorNode;
}
export declare class DivisorNode extends InternalPrimitiveConstraint<Divisor.Declaration> {
    traverseAllows: TraverseAllows<number>;
    readonly compiledCondition: string;
    readonly compiledNegation: string;
    readonly impliedBasis: BaseRoot;
    readonly expression: string;
    reduceJsonSchema(schema: JsonSchema.Numeric): JsonSchema.Numeric;
}
export declare const Divisor: {
    implementation: nodeImplementationOf<Divisor.Declaration>;
    Node: typeof DivisorNode;
};
export declare const writeIndivisibleMessage: (t: BaseRoot) => string;
export type writeIndivisibleMessage<actual> = writeInvalidOperandMessage<"divisor", actual>;
