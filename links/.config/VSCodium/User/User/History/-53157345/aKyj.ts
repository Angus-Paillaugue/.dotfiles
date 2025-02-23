import { InternalPrimitiveConstraint } from "../constraint.js";
import type { BaseRoot } from "../roots/root.js";
import type { BaseErrorContext, BaseNormalizedSchema, declareNode } from "../shared/declare.js";
import { type nodeImplementationOf } from "../shared/implement.js";
import { type JsonSchema } from "../shared/jsonSchema.js";
import type { TraverseAllows } from "../shared/traversal.js";
import { type LengthBoundableData } from "./range.js";
export declare namespace ExactLength {
    interface Inner {
        readonly rule: number;
    }
    interface NormalizedSchema extends BaseNormalizedSchema {
        readonly rule: number;
    }
    type Schema = NormalizedSchema | number;
    interface ErrorContext extends BaseErrorContext<"exactLength">, Inner {
    }
    type Declaration = declareNode<{
        kind: "exactLength";
        schema: Schema;
        normalizedSchema: NormalizedSchema;
        inner: Inner;
        prerequisite: LengthBoundableData;
        errorContext: ErrorContext;
    }>;
    type Node = ExactLengthNode;
}
export declare class ExactLengthNode extends InternalPrimitiveConstraint<ExactLength.Declaration> {
    traverseAllows: TraverseAllows<LengthBoundableData>;
    readonly compiledCondition: string;
    readonly compiledNegation: string;
    readonly impliedBasis: BaseRoot;
    readonly expression: string;
    reduceJsonSchema(schema: JsonSchema.LengthBoundable): JsonSchema.LengthBoundable;
}
export declare const ExactLength: {
    implementation: nodeImplementationOf<{
        intersectionIsOpen: false;
        childKind: never;
        reducibleTo: "exactLength";
        kind: "exactLength";
        schema: ExactLength.Schema;
        normalizedSchema: ExactLength.NormalizedSchema;
        inner: ExactLength.Inner;
        prerequisite: LengthBoundableData;
        errorContext: ExactLength.ErrorContext;
    }>;
    Node: typeof ExactLengthNode;
};
