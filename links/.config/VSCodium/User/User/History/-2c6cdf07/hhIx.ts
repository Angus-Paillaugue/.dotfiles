import type { Morph } from "../roots/morph.js";
import type { BaseRoot } from "../roots/root.js";
import type { declareNode } from "../shared/declare.js";
import { type nodeImplementationOf } from "../shared/implement.js";
import { BaseProp, type Prop } from "./prop.js";
export declare namespace Optional {
    interface Schema extends Prop.Schema {
        default?: unknown;
    }
    interface Inner extends Prop.Inner {
        default?: unknown;
    }
    type Declaration = declareNode<Prop.Declaration<"optional"> & {
        schema: Schema;
        normalizedSchema: Schema;
        inner: Inner;
    }>;
    type Node = OptionalNode;
}
export declare class OptionalNode extends BaseProp<"optional"> {
    constructor(...args: ConstructorParameters<typeof BaseProp>);
    get outProp(): Prop.Node;
    expression: string;
    defaultValueMorphs: Morph[];
    defaultValueMorphsReference: `$ark.${string}` | `$ark0.${string}` | `$ark9.${string}` | `$ark4.${string}` | `$ark2.${string}` | `$ark1.${string}` | `$ark3.${string}` | `$ark5.${string}` | `$ark6.${string}` | `$ark7.${string}` | `$ark8.${string}` | `$ark${`9${string}` & `${bigint}`}.${string}` | `$ark${`4${string}` & `${bigint}`}.${string}` | `$ark${`2${string}` & `${bigint}`}.${string}` | `$ark${`1${string}` & `${bigint}`}.${string}` | `$ark${`3${string}` & `${bigint}`}.${string}` | `$ark${`5${string}` & `${bigint}`}.${string}` | `$ark${`6${string}` & `${bigint}`}.${string}` | `$ark${`7${string}` & `${bigint}`}.${string}` | `$ark${`8${string}` & `${bigint}`}.${string}`;
    private computeDefaultValueMorphs;
}
export declare const Optional: {
    implementation: nodeImplementationOf<{
        reducibleTo: "optional";
        errorContext: null;
        kind: "optional";
        prerequisite: object;
        intersectionIsOpen: true;
        childKind: import("../shared/implement.js").RootKind;
        schema: Optional.Schema;
        normalizedSchema: Optional.Schema;
        inner: Optional.Inner;
    }>;
    Node: typeof OptionalNode;
};
export declare const assertDefaultValueAssignability: (node: BaseRoot, value: unknown, key?: string) => unknown;
export declare const writeUnassignableDefaultValueMessage: (message: string, key?: string) => string;
export type writeUnassignableDefaultValueMessage<baseDef extends string, defaultValue extends string> = `Default value ${defaultValue} is not assignable to ${baseDef}`;
export declare const writeNonPrimitiveNonFunctionDefaultValueMessage: (key: string) => string;
