import { ReadonlyPath, type array } from "@ark/util";
import type { ResolvedArkConfig } from ".pnpm/@ark+schema@0.26.0/node_modules/@ark/schema/config";
import type { Morph } from "../roots/morph.js";
import { ArkError, ArkErrors, type ArkErrorCode, type ArkErrorInput } from "./errors.js";
export type MorphsAtPath = {
    path: ReadonlyPath;
    morphs: array<Morph>;
};
export type BranchTraversalContext = {
    error: ArkError | undefined;
    queuedMorphs: MorphsAtPath[];
};
export declare class TraversalContext {
    path: PropertyKey[];
    queuedMorphs: MorphsAtPath[];
    errors: ArkErrors;
    branches: BranchTraversalContext[];
    seen: {
        [id in string]?: unknown[];
    };
    root: unknown;
    config: ResolvedArkConfig;
    constructor(root: unknown, config: ResolvedArkConfig);
    get currentBranch(): BranchTraversalContext | undefined;
    queueMorphs(morphs: array<Morph>): void;
    finalize(): unknown;
    private applyQueuedMorphs;
    private applyMorphsAtPath;
    get currentErrorCount(): number;
    hasError(): boolean;
    get failFast(): boolean;
    error<input extends ArkErrorInput>(input: input): ArkError<input extends {
        code: ArkErrorCode;
    } ? input["code"] : "predicate">;
    get data(): unknown;
    reject(input: ArkErrorInput): false;
    mustBe(expected: string): false;
    pushBranch(): void;
    popBranch(): BranchTraversalContext;
}
export declare const traverseKey: <result>(key: PropertyKey, fn: () => result, ctx: TraversalContext | undefined) => result;
export type TraversalMethodsByKind<input = unknown> = {
    Allows: TraverseAllows<input>;
    Apply: TraverseApply<input>;
};
export type TraversalKind = keyof TraversalMethodsByKind;
export type TraverseAllows<data = unknown> = (data: data, ctx: TraversalContext) => boolean;
export type TraverseApply<data = unknown> = (data: data, ctx: TraversalContext) => void;
