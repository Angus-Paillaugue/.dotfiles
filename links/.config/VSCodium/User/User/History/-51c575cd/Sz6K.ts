import { type Domain, type JsonPrimitive } from "@ark/util";
import type { BaseErrorContext, BaseNormalizedSchema, declareNode } from "../shared/declare.js";
import { type nodeImplementationOf } from "../shared/implement.js";
import { type JsonSchema } from "../shared/jsonSchema.js";
import type { TraverseAllows } from "../shared/traversal.js";
import { InternalBasis } from "./basis.js";
export declare namespace Unit {
    interface Schema<value = unknown> extends BaseNormalizedSchema {
        readonly unit: value;
    }
    interface Inner<value = unknown> {
        readonly unit: value;
    }
    interface ErrorContext<value = unknown> extends BaseErrorContext<"unit">, Inner<value> {
    }
    interface Declaration extends declareNode<{
        kind: "unit";
        schema: Schema;
        normalizedSchema: Schema;
        inner: Inner;
        errorContext: ErrorContext;
    }> {
    }
    type Node = UnitNode;
}
export declare class UnitNode extends InternalBasis<Unit.Declaration> {
    compiledValue: JsonPrimitive;
    serializedValue: string;
    compiledCondition: string;
    compiledNegation: string;
    expression: string;
    domain: Domain;
    get shortDescription(): string;
    protected innerToJsonSchema(): JsonSchema;
    traverseAllows: TraverseAllows;
}
export declare const Unit: {
    implementation: nodeImplementationOf<Unit.Declaration>;
    Node: typeof UnitNode;
};
