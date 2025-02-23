import type { ArkRegistry, mutable, requireKeys, show } from "@ark/util";
import type { intrinsic } from "./intrinsic.js";
import type { nodesByRegisteredId } from "./parse.js";
import type { ActualWriter, ArkErrorCode, ExpectedWriter, MessageWriter, ProblemWriter } from "./shared/errors.js";
import { type DescriptionWriter, type NodeKind } from "./shared/implement.js";
import type { UndeclaredKeyBehavior } from "./structure/structure.js";
export interface ArkSchemaRegistry extends ArkRegistry {
    intrinsic: typeof intrinsic;
    config: ArkConfig;
    defaultConfig: ResolvedArkConfig;
    nodesByRegisteredId: typeof nodesByRegisteredId;
}
type nodeConfigForKind<kind extends NodeKind> = Readonly<show<{
    description?: DescriptionWriter<kind>;
} & (kind extends ArkErrorCode ? {
    expected?: ExpectedWriter<kind>;
    actual?: ActualWriter<kind>;
    problem?: ProblemWriter<kind>;
    message?: MessageWriter<kind>;
} : {})>>;
type NodeConfigsByKind = {
    [kind in NodeKind]: nodeConfigForKind<kind>;
};
export type NodeConfig<kind extends NodeKind = NodeKind> = NodeConfigsByKind[kind];
type UnknownNodeConfig = {
    description?: DescriptionWriter;
    expected?: ExpectedWriter;
    actual?: ActualWriter;
    problem?: ProblemWriter;
    message?: MessageWriter;
};
export type ResolvedUnknownNodeConfig = requireKeys<UnknownNodeConfig, "description">;
export declare const configure: (config: ArkConfig) => ArkConfig;
export declare const mergeConfigs: (base: ArkConfig, extensions: ArkConfig) => mutable<ArkConfig>;
export type CloneImplementation = <original extends object>(original: original) => original;
export interface ArkConfig extends Partial<Readonly<NodeConfigsByKind>> {
    jitless?: boolean;
    clone?: boolean | CloneImplementation;
    onUndeclaredKey?: UndeclaredKeyBehavior;
}
export type resolveConfig<config extends ArkConfig> = show<{
    [k in keyof ArkConfig]-?: k extends NodeKind ? Required<config[k]> : k extends "clone" ? CloneImplementation | false : config[k];
} & Omit<config, keyof ArkConfig>>;
export type ResolvedArkConfig = resolveConfig<ArkConfig>;
export declare const extendConfig: (base: ArkConfig, extension: ArkConfig | undefined) => ArkConfig;
export declare const resolveConfig: <config extends ArkConfig>(config: config | undefined) => resolveConfig<config>;
export {};
