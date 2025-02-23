import type { BaseErrorContext, declareNode } from "../shared/declare.js";
import type { ArkErrorContextInput } from "../shared/errors.js";
import { type nodeImplementationOf } from "../shared/implement.js";
import { BaseProp, type Prop } from "./prop.js";
export declare namespace Required {
    interface ErrorContext extends BaseErrorContext<"required"> {
        missingValueDescription: string;
    }
    interface Schema extends Prop.Schema {
    }
    interface Inner extends Prop.Inner {
    }
    type Declaration = declareNode<Prop.Declaration<"required"> & {
        schema: Schema;
        normalizedSchema: Schema;
        inner: Inner;
        errorContext: ErrorContext;
        reducibleTo: "optional";
    }>;
    type Node = RequiredNode;
}
export declare class RequiredNode extends BaseProp<"required"> {
    expression: string;
    errorContext: ArkErrorContextInput<"required">;
    compiledErrorContext: string;
}
export declare const Required: {
    implementation: nodeImplementationOf<{
        kind: "required";
        prerequisite: object;
        intersectionIsOpen: true;
        childKind: import("../shared/implement.js").RootKind;
        schema: Required.Schema;
        normalizedSchema: Required.Schema;
        inner: Required.Inner;
        errorContext: Required.ErrorContext;
        reducibleTo: "optional";
    }>;
    Node: typeof RequiredNode;
};
