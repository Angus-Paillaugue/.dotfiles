import type { BaseRoot } from "../roots/root.js";
import type { BaseErrorContext, declareNode } from "../shared/declare.js";
import { type nodeImplementationOf } from "../shared/implement.js";
import { type JsonSchema } from "../shared/jsonSchema.js";
import type { TraverseAllows } from "../shared/traversal.js";
import { BaseRange, type BaseRangeInner, type LengthBoundableData, type UnknownExpandedRangeSchema, type UnknownNormalizedRangeSchema } from "./range.js";
export declare namespace MaxLength {
    interface Inner extends BaseRangeInner {
        rule: number;
    }
    interface NormalizedSchema extends UnknownNormalizedRangeSchema {
        rule: number;
    }
    interface ExpandedSchema extends UnknownExpandedRangeSchema {
        rule: number;
    }
    type Schema = ExpandedSchema | number;
    interface ErrorContext extends BaseErrorContext<"maxLength">, Inner {
    }
    interface Declaration extends declareNode<{
        kind: "maxLength";
        schema: Schema;
        reducibleTo: "exactLength";
        normalizedSchema: NormalizedSchema;
        inner: Inner;
        prerequisite: LengthBoundableData;
        errorContext: ErrorContext;
    }> {
    }
    type Node = MaxLengthNode;
}
export declare class MaxLengthNode extends BaseRange<MaxLength.Declaration> {
    readonly impliedBasis: BaseRoot;
    traverseAllows: TraverseAllows<LengthBoundableData>;
    reduceJsonSchema(schema: JsonSchema.LengthBoundable): JsonSchema.LengthBoundable;
}
export declare const MaxLength: {
    implementation: nodeImplementationOf<MaxLength.Declaration>;
    Node: typeof MaxLengthNode;
};
