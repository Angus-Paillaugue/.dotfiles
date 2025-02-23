import type { BaseRoot } from "../roots/root.js";
import type { BaseErrorContext, declareNode } from "../shared/declare.js";
import { type nodeImplementationOf } from "../shared/implement.js";
import { type JsonSchema } from "../shared/jsonSchema.js";
import type { TraverseAllows } from "../shared/traversal.js";
import { BaseRange, type BaseRangeInner, type LengthBoundableData, type UnknownExpandedRangeSchema, type UnknownNormalizedRangeSchema } from "./range.js";
export declare namespace MinLength {
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
    interface ErrorContext extends BaseErrorContext<"minLength">, Inner {
    }
    interface Declaration extends declareNode<{
        kind: "minLength";
        schema: Schema;
        normalizedSchema: NormalizedSchema;
        inner: Inner;
        prerequisite: LengthBoundableData;
        reducibleTo: "intersection";
        errorContext: ErrorContext;
    }> {
    }
    type Node = MinLengthNode;
}
export declare class MinLengthNode extends BaseRange<MinLength.Declaration> {
    readonly impliedBasis: BaseRoot;
    traverseAllows: TraverseAllows<LengthBoundableData>;
    reduceJsonSchema(schema: JsonSchema.LengthBoundable): JsonSchema.LengthBoundable;
}
export declare const MinLength: {
    implementation: nodeImplementationOf<MinLength.Declaration>;
    Node: typeof MinLengthNode;
};
