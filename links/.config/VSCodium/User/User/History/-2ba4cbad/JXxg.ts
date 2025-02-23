import { type Key } from "@ark/util";
import type { nodeOfKind } from "../kinds.js";
import type { BaseNode } from "../node.js";
import type { Domain } from "../roots/domain.js";
import type { BaseRoot } from "../roots/root.js";
import type { Prop } from "../structure/prop.js";
import type { BoundKind } from "./implement.js";
export interface DisjointEntry<kind extends DisjointKind = DisjointKind> {
    kind: kind;
    l: OperandsByDisjointKind[kind];
    r: OperandsByDisjointKind[kind];
    path: Key[];
    optional: boolean;
}
type OperandsByDisjointKind = {
    domain: nodeOfKind<"domain"> | Domain.Enumerable;
    unit: nodeOfKind<"unit">;
    proto: nodeOfKind<"proto">;
    presence: BaseRoot;
    range: nodeOfKind<BoundKind>;
    assignability: BaseNode;
    union: readonly BaseRoot[];
};
export type DisjointEntryContext = {
    path?: Key[];
    optional?: true;
};
export declare class Disjoint extends Array<DisjointEntry> {
    static init<kind extends DisjointKind>(kind: kind, l: OperandsByDisjointKind[kind], r: OperandsByDisjointKind[kind], ctx?: DisjointEntryContext): Disjoint;
    add<kind extends DisjointKind>(kind: kind, l: OperandsByDisjointKind[kind], r: OperandsByDisjointKind[kind], ctx?: DisjointEntryContext): Disjoint;
    describeReasons(): string;
    throw(): never;
    invert(): Disjoint;
    withPrefixKey(key: string | symbol, kind: Prop.Kind): Disjoint;
    toNeverIfDisjoint(): BaseRoot;
}
export type DisjointKind = keyof OperandsByDisjointKind;
export declare const writeUnsatisfiableExpressionError: <expression extends string>(expression: expression) => writeUnsatisfiableExpressionError<expression>;
export type writeUnsatisfiableExpressionError<expression extends string> = `${expression} results in an unsatisfiable type`;
export {};
