import type { BaseRoot } from "../roots/root.js";
import type { BaseErrorContext, declareNode } from "../shared/declare.js";
import { type nodeImplementationOf } from "../shared/implement.js";
import { type JsonSchema } from "../shared/jsonSchema.js";
import type { TraverseAllows } from "../shared/traversal.js";
import { BaseRange, type BaseRangeInner, type LimitSchemaValue, type UnknownExpandedRangeSchema, type UnknownNormalizedRangeSchema } from "./range.js";
export declare namespace After {
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
    interface ErrorContext extends BaseErrorContext<"after">, Inner {
    }
    interface Declaration extends declareNode<{
        kind: "after";
        schema: Schema;
        normalizedSchema: NormalizedSchema;
        inner: Inner;
        prerequisite: Date;
        errorContext: ErrorContext;
    }> {
    }
    type Node = AfterNode;
}
export declare class AfterNode extends BaseRange<After.Declaration> {
    impliedBasis: BaseRoot;
    collapsibleLimitString: string;
    traverseAllows: TraverseAllows<Date>;
    reduceJsonSchema(): JsonSchema;
}
export declare const After: {
    implementation: nodeImplementationOf<After.Declaration>;
    Node: typeof AfterNode;
};
