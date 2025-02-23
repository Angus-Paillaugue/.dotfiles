import { type array, type describe, type listable, type satisfy } from "@ark/util";
import type { NodeSchema, Prerequisite, innerAttachedAs, nodeOfKind } from "./kinds.js";
import { BaseNode } from "./node.js";
import type { NodeParseContext } from "./parse.js";
import type { Intersection } from "./roots/intersection.js";
import type { BaseRoot } from "./roots/root.js";
import type { BaseScope } from "./scope.js";
import type { NodeCompiler } from "./shared/compile.js";
import type { BaseNodeDeclaration } from "./shared/declare.js";
import { Disjoint } from "./shared/disjoint.js";
import { type ConstraintKind, type IntersectionContext, type NodeKind, type RootKind, type StructuralKind, type UnknownAttachments, type kindLeftOf } from "./shared/implement.js";
import type { JsonSchema } from "./shared/jsonSchema.js";
import type { TraverseAllows, TraverseApply } from "./shared/traversal.js";
import { arkKind } from "./shared/utils.js";
import type { Structure } from "./structure/structure.js";
export declare namespace Constraint {
    interface Declaration extends BaseNodeDeclaration {
        kind: ConstraintKind;
    }
    type ReductionResult = BaseRoot | Disjoint | Intersection.Inner.mutable;
    interface Attachments {
        impliedBasis: BaseRoot | null;
        impliedSiblings?: array<BaseConstraint> | null;
    }
    type PrimitiveKind = Exclude<ConstraintKind, StructuralKind>;
}
export declare abstract class BaseConstraint<
/** uses -ignore rather than -expect-error because this is not an error in .d.ts
 * @ts-ignore allow instantiation assignment to the base type */
out d extends Constraint.Declaration = Constraint.Declaration> extends BaseNode<d> {
    readonly [arkKind]: "constraint";
    constructor(attachments: UnknownAttachments, $: BaseScope);
    abstract readonly impliedBasis: BaseRoot | null;
    readonly impliedSiblings?: array<BaseConstraint>;
    intersect<r extends BaseConstraint>(r: r): intersectConstraintKinds<d["kind"], r["kind"]>;
}
export declare abstract class InternalPrimitiveConstraint<d extends Constraint.Declaration> extends BaseConstraint<d> {
    abstract traverseAllows: TraverseAllows<d["prerequisite"]>;
    abstract readonly compiledCondition: string;
    abstract readonly compiledNegation: string;
    abstract reduceJsonSchema(base: JsonSchema.Constrainable): JsonSchema.Constrainable;
    traverseApply: TraverseApply<d["prerequisite"]>;
    compile(js: NodeCompiler): void;
    get errorContext(): d["errorContext"];
    get compiledErrorContext(): string;
}
export declare const constraintKeyParser: <kind extends ConstraintKind>(kind: kind) => (schema: listable<NodeSchema<kind>>, ctx: NodeParseContext) => innerAttachedAs<kind> | undefined;
type ConstraintGroupKind = satisfy<NodeKind, "intersection" | "structure">;
interface ConstraintIntersectionState<kind extends ConstraintGroupKind = ConstraintGroupKind> {
    kind: kind;
    baseInner: Record<string, unknown>;
    l: BaseConstraint[];
    r: BaseConstraint[];
    roots: BaseRoot[];
    ctx: IntersectionContext;
}
export declare const intersectConstraints: <kind extends ConstraintGroupKind>(s: ConstraintIntersectionState<kind>) => nodeOfKind<RootKind | Extract<kind, "structure">> | Disjoint;
export declare const flattenConstraints: (inner: object) => BaseConstraint[];
type FlatIntersectionInner = Intersection.Inner & Structure.Inner;
export declare const unflattenConstraints: (constraints: array<BaseConstraint>) => FlatIntersectionInner;
export type constraintKindLeftOf<kind extends ConstraintKind> = ConstraintKind & kindLeftOf<kind>;
export type constraintKindOrLeftOf<kind extends ConstraintKind> = kind | constraintKindLeftOf<kind>;
export type intersectConstraintKinds<l extends ConstraintKind, r extends ConstraintKind> = nodeOfKind<l | r | "unit" | "union"> | Disjoint | null;
export declare const throwInvalidOperandError: (kind: "minLength" | "maxLength" | "pattern" | "required" | "divisor" | "exactLength" | "max" | "min" | "before" | "after" | "optional" | "index" | "sequence" | "structure" | "predicate", expected: BaseRoot<import("./roots/root.js").InternalRootDeclaration>, actual: BaseRoot<import("./roots/root.js").InternalRootDeclaration>) => never;
export declare const writeInvalidOperandMessage: <kind extends ConstraintKind, expected extends BaseRoot, actual extends BaseRoot>(kind: kind, expected: expected, actual: actual) => string;
export type writeInvalidOperandMessage<kind extends ConstraintKind, actual> = `${Capitalize<kind>} operand must be ${describe<Prerequisite<kind>>} (was ${describe<Exclude<actual, Prerequisite<kind>>>})`;
export {};
