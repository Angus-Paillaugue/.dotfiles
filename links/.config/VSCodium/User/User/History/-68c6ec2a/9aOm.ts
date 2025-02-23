import { type Key } from "@ark/util";
import { BaseConstraint } from "../constraint.js";
import type { nodeOfKind, RootSchema } from "../kinds.js";
import { type BaseNode, type DeepNodeTransformation, type DeepNodeTransformContext, type FlatRef } from "../node.js";
import type { BaseRoot } from "../roots/root.js";
import { type NodeCompiler } from "../shared/compile.js";
import type { BaseNormalizedSchema } from "../shared/declare.js";
import { Disjoint } from "../shared/disjoint.js";
import type { IntersectionContext, RootKind } from "../shared/implement.js";
import { type TraverseAllows, type TraverseApply } from "../shared/traversal.js";
import type { Optional } from "./optional.js";
import type { Required } from "./required.js";
export declare namespace Prop {
    type Kind = "required" | "optional";
    type Node = nodeOfKind<Kind>;
    interface Schema extends BaseNormalizedSchema {
        readonly key: Key;
        readonly value: RootSchema;
    }
    interface Inner {
        readonly key: Key;
        readonly value: BaseRoot;
    }
    interface Declaration<kind extends Kind = Kind> {
        kind: kind;
        prerequisite: object;
        intersectionIsOpen: true;
        childKind: RootKind;
    }
}
export declare const intersectProps: (l: nodeOfKind<Prop.Kind>, r: nodeOfKind<Prop.Kind>, ctx: IntersectionContext) => nodeOfKind<Prop.Kind> | Disjoint | null;
export declare abstract class BaseProp<kind extends Prop.Kind = Prop.Kind> extends BaseConstraint<kind extends "required" ? Required.Declaration : Optional.Declaration> {
    required: boolean;
    optional: boolean;
    impliedBasis: BaseRoot;
    serializedKey: string;
    compiledKey: string;
    get flatRefs(): FlatRef[];
    protected _transform(mapper: DeepNodeTransformation, ctx: DeepNodeTransformContext): BaseNode | null;
    hasDefault(): this is Optional.Node & {
        default: unknown;
    };
    traverseAllows: TraverseAllows<object>;
    traverseApply: TraverseApply<object>;
    compile(js: NodeCompiler): void;
}
