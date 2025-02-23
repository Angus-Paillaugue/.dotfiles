import type { BaseRoot } from "../roots/root.js";
import type { BaseErrorContext, declareNode } from "../shared/declare.js";
import { type nodeImplementationOf } from "../shared/implement.js";
import { type JsonSchema } from "../shared/jsonSchema.js";
import type { TraverseAllows } from "../shared/traversal.js";
import { BaseRange, type BaseRangeInner, type LimitSchemaValue, type UnknownExpandedRangeSchema, type UnknownNormalizedRangeSchema } from "./range.js";
export declare namespace Before {
    interface Inner extends BaseRangeInner {
        rule: Date;
    }
    interface NormalizedSchema extends UnknownNormalizedRangeSchema {
        rule: LimitSchemaValue;
    }
    interface ExpandedSchema extends UnknownExpandedRangeSchema {
        rule: LimitSchemaValue;
    }
    type Schema = ExpandedSchema | LimitSchemaValue;
    interface ErrorContext extends BaseErrorContext<"before">, Inner {
    }
    interface Declaration extends declareNode<{
        kind: "before";
        schema: Schema;
        normalizedSchema: NormalizedSchema;
        inner: Inner;
        prerequisite: Date;
        errorContext: ErrorContext;
    }> {
    }
    type Node = BeforeNode;
}
export declare class BeforeNode extends BaseRange<Before.Declaration> {
    collapsibleLimitString: string;
    traverseAllows: TraverseAllows<Date>;
    impliedBasis: BaseRoot;
    reduceJsonSchema(): JsonSchema;
}
export declare const Before: {
    implementation: nodeImplementationOf<Before.Declaration>;
    Node: typeof BeforeNode;
};
