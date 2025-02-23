import { inferred, type array } from "@ark/util";
import { type Constraint } from "../constraint.js";
import type { NodeSchema, nodeOfKind, reducibleKindOf } from "../kinds.js";
import { BaseNode, type FlatRef, type GettableKeyOrNode, type KeyOrKeyNode } from "../node.js";
import type { Predicate } from "../predicate.js";
import type { Divisor } from "../refinements/divisor.js";
import type { ExactLength } from "../refinements/exactLength.js";
import type { Pattern } from "../refinements/pattern.js";
import type { ExclusiveDateRangeSchema, ExclusiveNumericRangeSchema, InclusiveDateRangeSchema, InclusiveNumericRangeSchema, LimitSchemaValue, UnknownRangeSchema } from "../refinements/range.js";
import type { BaseScope } from "../scope.js";
import type { BaseNodeDeclaration, MetaSchema } from "../shared/declare.js";
import { Disjoint } from "../shared/disjoint.js";
import { type NodeKind, type RootKind, type UnknownAttachments, type kindRightOf } from "../shared/implement.js";
import type { JsonSchema } from "../shared/jsonSchema.js";
import type { StandardSchemaV1 } from "../shared/standardSchema.js";
import { arkKind } from "../shared/utils.js";
import type { Prop } from "../structure/prop.js";
import type { PropFlatMapper, UndeclaredKeyBehavior } from "../structure/structure.js";
import type { Morph } from "./morph.js";
import type { Union } from "./union.js";
export interface InternalRootDeclaration extends BaseNodeDeclaration {
    kind: RootKind;
}
export declare abstract class BaseRoot<
/** @ts-ignore cast variance */
out d extends InternalRootDeclaration = InternalRootDeclaration> extends BaseNode<d> implements StandardSchemaV1 {
    readonly [arkKind]: "root";
    readonly [inferred]: unknown;
    constructor(attachments: UnknownAttachments, $: BaseScope);
    assert: (data: unknown) => unknown;
    get internal(): this;
    get "~standard"(): StandardSchemaV1.ArkTypeProps;
    get optionalMeta(): boolean;
    /** returns unset if there is no default */
    get defaultMeta(): unknown;
    withoutOptionalOrDefaultMeta(): this;
    as(): this;
    brand(name: string): this;
    brandAttributes(): this;
    unbrandAttributes(): this;
    readonly(): this;
    readonly branches: readonly nodeOfKind<Union.ChildKind>[];
    distribute<mapOut, reduceOut = mapOut[]>(mapBranch: (branch: nodeOfKind<Union.ChildKind>, i: number, branches: array<nodeOfKind<Union.ChildKind>>) => mapOut, reduceMapped?: (mappedBranches: mapOut[]) => reduceOut): reduceOut;
    abstract get shortDescription(): string;
    protected abstract innerToJsonSchema(): JsonSchema;
    toJsonSchema(): JsonSchema;
    intersect(r: unknown): BaseRoot | Disjoint;
    rawIntersect(r: BaseRoot): BaseRoot;
    toNeverIfDisjoint(): BaseRoot;
    and(r: unknown): BaseRoot;
    rawAnd(r: BaseRoot): BaseRoot;
    or(r: unknown): BaseRoot;
    rawOr(r: BaseRoot): BaseRoot;
    map(flatMapEntry: PropFlatMapper): BaseRoot;
    pick(...keys: KeyOrKeyNode[]): BaseRoot;
    omit(...keys: KeyOrKeyNode[]): BaseRoot;
    required(): BaseRoot;
    partial(): BaseRoot;
    private _keyof?;
    keyof(): BaseRoot;
    get props(): Prop.Node[];
    merge(r: unknown): BaseRoot;
    private applyStructuralOperation;
    get(...path: GettableKeyOrNode[]): BaseRoot;
    extract(r: unknown): BaseRoot;
    exclude(r: unknown): BaseRoot;
    array(): BaseRoot;
    overlaps(r: unknown): boolean;
    extends(r: unknown): boolean;
    ifExtends(r: unknown): BaseRoot | undefined;
    subsumes(r: unknown): boolean;
    configure(meta: MetaSchema): this;
    describe(description: string): this;
    optional(): this;
    default(value: unknown): this;
    from(input: unknown): unknown;
    protected _pipe(...morphs: Morph[]): BaseRoot;
    protected tryPipe(...morphs: Morph[]): BaseRoot;
    pipe: ((...morphs: Morph[]) => BaseRoot) & {
        try: (...morphs: Morph[]) => BaseRoot;
    };
    to(def: unknown): BaseRoot;
    private toNode;
    private pipeOnce;
    get flatMorphs(): array<FlatRef<Morph.Node>>;
    narrow(predicate: Predicate): BaseRoot;
    constrain<kind extends Constraint.PrimitiveKind>(kind: kind, schema: NodeSchema<kind>): BaseRoot;
    constrainIn<kind extends Constraint.PrimitiveKind>(kind: kind, schema: NodeSchema<kind>): BaseRoot;
    constrainOut<kind extends Constraint.PrimitiveKind>(kind: kind, schema: NodeSchema<kind>): BaseRoot;
    private _constrain;
    onUndeclaredKey(cfg: UndeclaredKeyBehavior | UndeclaredKeyConfig): BaseRoot;
    onDeepUndeclaredKey(behavior: UndeclaredKeyBehavior): BaseRoot;
    satisfying(predicate: Predicate): BaseRoot;
    divisibleBy(schema: Divisor.Schema): BaseRoot;
    matching(schema: Pattern.Schema): BaseRoot;
    atLeast(schema: InclusiveNumericRangeSchema): BaseRoot;
    atMost(schema: InclusiveNumericRangeSchema): BaseRoot;
    moreThan(schema: ExclusiveNumericRangeSchema): BaseRoot;
    lessThan(schema: ExclusiveNumericRangeSchema): BaseRoot;
    atLeastLength(schema: InclusiveNumericRangeSchema): BaseRoot;
    atMostLength(schema: InclusiveNumericRangeSchema): BaseRoot;
    moreThanLength(schema: ExclusiveNumericRangeSchema): BaseRoot;
    lessThanLength(schema: ExclusiveNumericRangeSchema): BaseRoot;
    exactlyLength(schema: ExactLength.Schema): BaseRoot;
    atOrAfter(schema: InclusiveDateRangeSchema): BaseRoot;
    atOrBefore(schema: InclusiveDateRangeSchema): BaseRoot;
    laterThan(schema: ExclusiveDateRangeSchema): BaseRoot;
    earlierThan(schema: ExclusiveDateRangeSchema): BaseRoot;
}
export type UndeclaredKeyConfig = {
    rule: UndeclaredKeyBehavior;
    deep?: boolean;
};
export declare const emptyBrandNameMessage = "Expected a non-empty brand name after #";
export type emptyBrandNameMessage = typeof emptyBrandNameMessage;
export declare const exclusivizeRangeSchema: <schema extends UnknownRangeSchema>(schema: schema) => schema;
export type exclusivizeRangeSchema<schema extends UnknownRangeSchema> = schema extends LimitSchemaValue ? {
    rule: schema;
    exclusive: true;
} : schema;
export declare const typeOrTermExtends: (t: unknown, base: unknown) => boolean;
export type intersectRoot<l extends RootKind, r extends NodeKind> = [
    l,
    r
] extends [r, l] ? l : asymmetricIntersectionOf<l, r> | asymmetricIntersectionOf<r, l>;
type asymmetricIntersectionOf<l extends NodeKind, r extends NodeKind> = l extends unknown ? r extends kindRightOf<l> ? l | reducibleKindOf<l> : never : never;
export type schemaKindRightOf<kind extends RootKind> = Extract<kindRightOf<kind>, RootKind>;
export type schemaKindOrRightOf<kind extends RootKind> = kind | schemaKindRightOf<kind>;
export type StructuralOperationBranchResultByName = {
    keyof: Union.ChildNode;
    pick: Union.ChildNode;
    omit: Union.ChildNode;
    get: Union.ChildNode;
    map: Union.ChildNode;
    required: Union.ChildNode;
    partial: Union.ChildNode;
    merge: Union.ChildNode;
    props: array<Prop.Node>;
};
export type StructuralOperationName = keyof StructuralOperationBranchResultByName;
export declare const writeLiteralUnionEntriesMessage: (expression: string) => string;
export declare const writeNonStructuralOperandMessage: <operation extends StructuralOperationName, operand extends string>(operation: operation, operand: operand) => writeNonStructuralOperandMessage<operation, operand>;
export type writeNonStructuralOperandMessage<operation extends StructuralOperationName, operand extends string> = `${operation} operand must be an object (was ${operand})`;
export {};
