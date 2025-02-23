import { type array, type mutable, type show } from "@ark/util";
import type { BaseConstraint } from "../constraint.js";
import type { GenericRoot } from "../generic.js";
import type { InternalModule } from "../module.js";
import type { BaseNode } from "../node.js";
import type { BaseParseContext } from "../parse.js";
import type { BaseRoot } from "../roots/root.js";
import type { BaseScope } from "../scope.js";
import type { ArkError } from "./errors.js";
export declare const makeRootAndArrayPropertiesMutable: <o extends object>(o: o) => makeRootAndArrayPropertiesMutable<o>;
export type makeRootAndArrayPropertiesMutable<inner> = {
    -readonly [k in keyof inner]: inner[k] extends array | undefined ? mutable<inner[k]> : inner[k];
} & unknown;
export type internalImplementationOf<external, typeOnlyKey extends keyof external = never> = {
    [k in Exclude<keyof external, typeOnlyKey>]: external[k] extends ((...args: infer args) => unknown) ? (...args: {
        [i in keyof args]: never;
    }) => unknown : unknown;
};
export type arkKind = typeof arkKind;
export declare const arkKind: " arkKind";
export interface ArkKinds {
    constraint: BaseConstraint;
    root: BaseRoot;
    scope: BaseScope;
    generic: GenericRoot;
    module: InternalModule;
    error: ArkError;
    context: BaseParseContext;
}
export type ArkKind = show<keyof ArkKinds>;
export declare const hasArkKind: <kind extends ArkKind>(value: unknown, kind: kind) => value is ArkKinds[kind];
export declare const isNode: (value: unknown) => value is BaseNode;
