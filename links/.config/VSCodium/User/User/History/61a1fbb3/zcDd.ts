import { Callable, type GuardablePredicate, type Json, type Key, type array, type conform, type listable, type mutable } from "@ark/util";
import type { BaseConstraint } from "./constraint.js";
import type { Inner, NormalizedSchema, nodeOfKind, reducibleKindOf } from "./kinds.js";
import type { BaseParseOptions } from "./parse.js";
import type { Morph } from "./roots/morph.js";
import type { BaseRoot } from "./roots/root.js";
import type { Unit } from "./roots/unit.js";
import type { BaseScope } from "./scope.js";
import type { NodeCompiler } from "./shared/compile.js";
import type { BaseNodeDeclaration, MetaSchema, attachmentsOf } from "./shared/declare.js";
import type { ArkErrors } from "./shared/errors.js";
import { type BasisKind, type NodeKind, type OpenNodeKind, type RefinementKind, type StructuralKind, type UnknownAttachments } from "./shared/implement.js";
import { TraversalContext, type TraverseAllows, type TraverseApply } from "./shared/traversal.js";
import { type arkKind } from "./shared/utils.js";
import type { UndeclaredKeyHandling } from "./structure/structure.js";
export declare abstract class BaseNode<
/** uses -ignore rather than -expect-error because this is not an error in .d.ts
 * @ts-ignore allow instantiation assignment to the base type */
out d extends BaseNodeDeclaration = BaseNodeDeclaration> extends Callable<(data: d["prerequisite"], ctx?: TraversalContext) => unknown, attachmentsOf<d>> {
    attachments: UnknownAttachments;
    $: BaseScope;
    constructor(attachments: UnknownAttachments, $: BaseScope);
    withMeta(meta: ArkEnv.meta | ((currentMeta: ArkEnv.meta) => ArkEnv.meta)): this;
    abstract traverseAllows: TraverseAllows<d["prerequisite"]>;
    abstract traverseApply: TraverseApply<d["prerequisite"]>;
    abstract expression: string;
    abstract compile(js: NodeCompiler): void;
    readonly includesMorph: boolean;
    readonly hasContextualPredicate: boolean;
    readonly isCyclic: boolean;
    readonly allowsRequiresContext: boolean;
    readonly referencesById: Record<string, BaseNode>;
    protected cacheGetter<name extends keyof this>(name: name, value: this[name]): this[name];
    get description(): string;
    get references(): BaseNode[];
    get shallowReferences(): BaseNode[];
    get shallowMorphs(): Morph.Node[];
    get flatRefs(): array<FlatRef>;
    readonly precedence: number;
    precompilation: string | undefined;
    allows: (data: d["prerequisite"]) => boolean;
    traverse(data: d["prerequisite"]): ArkErrors | {} | null | undefined;
    get in(): this extends {
        [arkKind]: "root";
    } ? BaseRoot : BaseNode;
    get out(): this extends {
        [arkKind]: "root";
    } ? BaseRoot : BaseNode;
    getIo(ioKind: "in" | "out"): BaseNode;
    toJSON(): Json;
    toString(): string;
    equals(r: unknown): boolean;
    ifEquals(r: unknown): BaseNode | undefined;
    hasKind<kind extends NodeKind>(kind: kind): this is nodeOfKind<kind>;
    assertHasKind<kind extends NodeKind>(kind: kind): nodeOfKind<kind>;
    hasKindIn<kinds extends NodeKind[]>(...kinds: kinds): this is nodeOfKind<kinds[number]>;
    assertHasKindIn<kinds extends NodeKind[]>(...kinds: kinds): nodeOfKind<kinds[number]>;
    isBasis(): this is nodeOfKind<BasisKind>;
    isConstraint(): this is BaseConstraint;
    isStructural(): this is nodeOfKind<StructuralKind>;
    isRefinement(): this is nodeOfKind<RefinementKind>;
    isRoot(): this is BaseRoot;
    isUnknown(): boolean;
    isNever(): boolean;
    hasUnit<value>(value: unknown): this is Unit.Node & {
        unit: value;
    };
    hasOpenIntersection(): this is nodeOfKind<OpenNodeKind>;
    get nestableExpression(): string;
    firstReference<narrowed>(filter: GuardablePredicate<BaseNode, conform<narrowed, BaseNode>>): narrowed | undefined;
    firstReferenceOrThrow<narrowed extends BaseNode>(filter: GuardablePredicate<BaseNode, narrowed>): narrowed;
    firstReferenceOfKind<kind extends NodeKind>(kind: kind): nodeOfKind<kind> | undefined;
    firstReferenceOfKindOrThrow<kind extends NodeKind>(kind: kind): nodeOfKind<kind>;
    transform<mapper extends DeepNodeTransformation>(mapper: mapper, opts?: DeepNodeTransformOptions): nodeOfKind<reducibleKindOf<this["kind"]>> | Extract<ReturnType<mapper>, null>;
    protected _transform(mapper: DeepNodeTransformation, ctx: DeepNodeTransformContext): BaseNode | null;
    configureShallowDescendants(meta: MetaSchema): this;
}
/** a literal key (named property) or a node (index signatures) representing part of a type structure */
export type KeyOrKeyNode = Key | BaseRoot;
export type GettableKeyOrNode = KeyOrKeyNode | number;
export type FlatRef<root extends BaseRoot = BaseRoot> = {
    path: array<KeyOrKeyNode>;
    node: root;
    propString: string;
};
export declare const typePathToPropString: (path: array<KeyOrKeyNode>) => string;
export declare const flatRef: <node extends BaseRoot>(path: array<KeyOrKeyNode>, node: node) => FlatRef<node>;
export declare const flatRefsAreEqual: (l: FlatRef, r: FlatRef) => boolean;
export declare const appendUniqueFlatRefs: <node extends BaseRoot>(existing: FlatRef<node>[] | undefined, refs: listable<FlatRef<node>>) => FlatRef<node>[];
export declare const appendUniqueNodes: <node extends BaseNode>(existing: node[] | undefined, refs: listable<node>) => node[];
export type DeepNodeTransformOptions = {
    shouldTransform?: ShouldTransformFn;
    bindScope?: BaseScope;
    prereduced?: boolean;
};
export type ShouldTransformFn = (node: BaseNode, ctx: DeepNodeTransformContext) => boolean;
export interface DeepNodeTransformContext extends DeepNodeTransformOptions {
    path: mutable<array<KeyOrKeyNode>>;
    seen: {
        [originalId: string]: (() => BaseNode | undefined) | undefined;
    };
    parseOptions: BaseParseOptions;
    undeclaredKeyHandling: UndeclaredKeyHandling | undefined;
}
export type DeepNodeTransformation = <kind extends NodeKind>(kind: kind, inner: Inner<kind>, ctx: DeepNodeTransformContext) => NormalizedSchema<kind> | null;
