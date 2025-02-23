import { InternalPrimitiveConstraint } from "../constraint.js";
import type { BaseRoot } from "../roots/root.js";
import type { BaseErrorContext, BaseNormalizedSchema, declareNode } from "../shared/declare.js";
import { type nodeImplementationOf } from "../shared/implement.js";
import { type JsonSchema } from "../shared/jsonSchema.js";
export declare namespace Pattern {
    interface NormalizedSchema extends BaseNormalizedSchema {
        readonly rule: string;
        readonly flags?: string;
    }
    interface Inner {
        readonly rule: string;
        readonly flags?: string;
    }
    type Schema = NormalizedSchema | string | RegExp;
    interface ErrorContext extends BaseErrorContext<"pattern">, Inner {
    }
    interface Declaration extends declareNode<{
        kind: "pattern";
        schema: Schema;
        normalizedSchema: NormalizedSchema;
        inner: Inner;
        intersectionIsOpen: true;
        prerequisite: string;
        errorContext: ErrorContext;
    }> {
    }
    type Node = PatternNode;
}
export declare class PatternNode extends InternalPrimitiveConstraint<Pattern.Declaration> {
    readonly instance: RegExp;
    readonly expression: string;
    traverseAllows: (string: string) => boolean;
    readonly compiledCondition: string;
    readonly compiledNegation: string;
    readonly impliedBasis: BaseRoot;
    reduceJsonSchema(schema: JsonSchema.String): JsonSchema.String;
}
export declare const Pattern: {
    implementation: nodeImplementationOf<Pattern.Declaration>;
    Node: typeof PatternNode;
};
