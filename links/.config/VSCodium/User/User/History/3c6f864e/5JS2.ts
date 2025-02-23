import type { BaseRoot } from "../roots/root.js";
import type { BaseErrorContext, declareNode } from "../shared/declare.js";
import { type nodeImplementationOf } from "../shared/implement.js";
import type { JsonSchema } from "../shared/jsonSchema.js";
import type { TraverseAllows } from "../shared/traversal.js";
import { BaseRange, type BaseRangeInner, type UnknownExpandedRangeSchema } from "./range.js";
export declare namespace Min {
    interface Inner extends BaseRangeInner {
        rule: number;
        exclusive?: true;
    }
    interface NormalizedSchema extends UnknownExpandedRangeSchema {
        rule: number;
    }
    type Schema = NormalizedSchema | number;
    interface ErrorContext extends BaseErrorContext<"min">, Inner {
    }
    interface Declaration extends declareNode<{
        kind: "min";
        schema: Schema;
        normalizedSchema: NormalizedSchema;
        inner: Inner;
        prerequisite: number;
        errorContext: ErrorContext;
    }> {
    }
    type Node = MinNode;
}
export declare class MinNode extends BaseRange<Min.Declaration> {
    readonly impliedBasis: BaseRoot;
    traverseAllows: TraverseAllows<number>;
    reduceJsonSchema(schema: JsonSchema.Numeric): JsonSchema.Numeric;
}
export declare const Min: {
    implementation: nodeImplementationOf<Min.Declaration>;
    Node: typeof MinNode;
};
