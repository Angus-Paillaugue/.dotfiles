import { CastableBase, ReadonlyArray, ReadonlyPath, type array, type propwiseXor, type show } from "@ark/util";
import type { Prerequisite, errorContext } from "../kinds.js";
import type { NodeKind } from "./implement.js";
import type { StandardSchemaV1 } from "./standardSchema.js";
import type { TraversalContext } from "./traversal.js";
import { arkKind } from "./utils.js";
export type ArkErrorResult = ArkError | ArkErrors;
export declare class ArkError<code extends ArkErrorCode = ArkErrorCode> extends CastableBase<ArkErrorContextInput<code>> {
    readonly [arkKind] = "error";
    path: ReadonlyPath;
    data: Prerequisite<code>;
    private nodeConfig;
    protected input: ArkErrorContextInput<code>;
    constructor(input: ArkErrorContextInput<code>, ctx: TraversalContext);
    hasCode<code extends ArkErrorCode>(code: code): this is ArkError<code>;
    get propString(): string;
    get expected(): string;
    get actual(): string;
    get problem(): string;
    get message(): string;
    toString(): string;
    throw(): never;
}
export declare class ArkErrors extends ReadonlyArray<ArkError> implements StandardSchemaV1.FailureResult {
    protected ctx: TraversalContext;
    constructor(ctx: TraversalContext);
    byPath: Record<string, ArkError>;
    byAncestorPath: Record<string, ArkError[]>;
    count: number;
    private mutable;
    add(error: ArkError): void;
    affectsPath(path: ReadonlyPath): boolean;
    private _add;
    private addAncestorPaths;
    merge(errors: ArkErrors): void;
    get summary(): string;
    get message(): string;
    get issues(): this;
    toString(): string;
    throw(): never;
}
export type ArkErrorsMergeOptions = {
    relativePath?: array<PropertyKey>;
};
export interface DerivableErrorContext<code extends ArkErrorCode = ArkErrorCode> {
    expected: string;
    actual: string;
    problem: string;
    message: string;
    data: Prerequisite<code>;
    path: array<PropertyKey>;
    propString: string;
}
export type DerivableErrorContextInput<code extends ArkErrorCode = ArkErrorCode> = Partial<DerivableErrorContext<code>> & propwiseXor<{
    path?: array<PropertyKey>;
}, {
    relativePath?: array<PropertyKey>;
}>;
export type ArkErrorCode = {
    [kind in NodeKind]: errorContext<kind> extends null ? never : kind;
}[NodeKind];
type ArkErrorContextInputsByCode = {
    [code in ArkErrorCode]: errorContext<code> & DerivableErrorContextInput<code>;
};
export type ArkErrorContextInput<code extends ArkErrorCode = ArkErrorCode> = ArkErrorContextInputsByCode[code];
export type MessageContext<code extends ArkErrorCode = ArkErrorCode> = Omit<ArkError<code>, "message">;
export type ProblemContext<code extends ArkErrorCode = ArkErrorCode> = Omit<MessageContext<code>, "problem">;
export type CustomErrorInput = show<{
    code?: undefined;
} & DerivableErrorContextInput>;
export type ArkErrorInput = string | ArkErrorContextInput | CustomErrorInput;
export type ProblemWriter<code extends ArkErrorCode = ArkErrorCode> = (context: ProblemContext<code>) => string;
export type MessageWriter<code extends ArkErrorCode = ArkErrorCode> = (context: MessageContext<code>) => string;
export type getAssociatedDataForError<code extends ArkErrorCode> = code extends NodeKind ? Prerequisite<code> : unknown;
export type ExpectedWriter<code extends ArkErrorCode = ArkErrorCode> = (source: errorContext<code>) => string;
export type ActualWriter<code extends ArkErrorCode = ArkErrorCode> = (data: getAssociatedDataForError<code>) => string;
export {};
