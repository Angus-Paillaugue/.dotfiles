import { type array, type Key, type listable } from "@ark/util";
import { BaseConstraint } from "../constraint.js";
import type { GettableKeyOrNode, KeyOrKeyNode } from "../node.js";
import { type BaseRoot } from "../roots/root.js";
import type { BaseScope } from "../scope.js";
import type { NodeCompiler } from "../shared/compile.js";
import type { BaseNormalizedSchema, declareNode } from "../shared/declare.js";
import { type nodeImplementationOf, type StructuralKind } from "../shared/implement.js";
import { type JsonSchema } from "../shared/jsonSchema.js";
import { type RegisteredReference } from "../shared/registry.js";
import { type TraversalContext, type TraversalKind, type TraverseAllows, type TraverseApply } from "../shared/traversal.js";
import { makeRootAndArrayPropertiesMutable } from "../shared/utils.js";
import type { Index } from "./index.js";
import { Optional } from "./optional.js";
import type { Prop } from "./prop.js";
import type { Required } from "./required.js";
import type { Sequence } from "./sequence.js";
export type UndeclaredKeyBehavior = "ignore" | UndeclaredKeyHandling;
export type UndeclaredKeyHandling = "reject" | "delete";
export declare namespace Structure {
    interface Schema extends BaseNormalizedSchema {
        readonly optional?: readonly Optional.Schema[];
        readonly required?: readonly Required.Schema[];
        readonly index?: readonly Index.Schema[];
        readonly sequence?: Sequence.Schema;
        readonly undeclared?: UndeclaredKeyBehavior;
    }
    interface Inner {
        readonly optional?: readonly Optional.Node[];
        readonly required?: readonly Required.Node[];
        readonly index?: readonly Index.Node[];
        readonly sequence?: Sequence.Node;
        readonly undeclared?: UndeclaredKeyHandling;
    }
    namespace Inner {
        type mutable = makeRootAndArrayPropertiesMutable<Inner>;
    }
    interface Declaration extends declareNode<{
        kind: "structure";
        schema: Schema;
        normalizedSchema: Schema;
        inner: Inner;
        prerequisite: object;
        childKind: StructuralKind;
    }> {
    }
    type Node = StructureNode;
}
export declare class StructureNode extends BaseConstraint<Structure.Declaration> {
    impliedBasis: BaseRoot;
    impliedSiblings: BaseConstraint<import("../constraint.js").Constraint.Declaration>[];
    props: array<Prop.Node>;
    propsByKey: Record<Key, Prop.Node | undefined>;
    propsByKeyReference: RegisteredReference;
    expression: string;
    requiredKeys: Key[];
    optionalKeys: Key[];
    literalKeys: Key[];
    _keyof: BaseRoot | undefined;
    keyof(): BaseRoot;
    map(flatMapProp: PropFlatMapper): StructureNode;
    assertHasKeys(keys: array<KeyOrKeyNode>): void;
    get(indexer: GettableKeyOrNode, ...path: array<GettableKeyOrNode>): BaseRoot;
    readonly exhaustive: boolean;
    pick(...keys: KeyOrKeyNode[]): StructureNode;
    omit(...keys: KeyOrKeyNode[]): StructureNode;
    optionalize(): StructureNode;
    require(): StructureNode;
    merge(r: StructureNode): StructureNode;
    private filterKeys;
    traverseAllows: TraverseAllows<object>;
    traverseApply: TraverseApply<object>;
    protected _traverse: (traversalKind: TraversalKind, data: object, ctx: TraversalContext) => boolean;
    compile(js: NodeCompiler): void;
    protected compileExhaustiveEntry(js: NodeCompiler): NodeCompiler;
    reduceJsonSchema(schema: JsonSchema.Structure): JsonSchema.Structure;
    reduceObjectJsonSchema(schema: JsonSchema.Object): JsonSchema.Object;
}
export type PropFlatMapper = (entry: Prop.Node) => listable<MappedPropInner>;
export type MappedPropInner = BaseMappedPropInner | OptionalMappedPropInner;
export interface BaseMappedPropInner extends Required.Schema {
    kind?: "required" | "optional";
}
export interface OptionalMappedPropInner extends Optional.Schema {
    kind: "optional";
}
export declare const Structure: {
    implementation: nodeImplementationOf<Structure.Declaration>;
    Node: typeof StructureNode;
};
export declare const writeNumberIndexMessage: (indexExpression: string, sequenceExpression: string) => string;
export type NormalizedIndex = {
    index?: Index.Node;
    required?: Required.Node[];
    optional?: Optional.Node[];
};
/** extract enumerable named props from an index signature */
export declare const normalizeIndex: (signature: BaseRoot, value: BaseRoot, $: BaseScope) => NormalizedIndex;
export declare const typeKeyToString: (k: KeyOrKeyNode) => string;
export declare const writeInvalidKeysMessage: <o extends string, keys extends array<KeyOrKeyNode>>(o: o, keys: keys) => string;
