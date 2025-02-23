import type { array } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/arrays.js";
import type { conform, satisfy, show } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/generics.js";
import type { intersectParameters } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/intersections.js";
import { type Constructor } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/objectKinds.js";
import { NoopBase } from ".pnpm/@ark+util@0.26.0/node_modules/@ark/util/internal/records.js";
export type TraitImplementation = <traits extends TraitConstructor[], implementation extends implementationOf<s>, s extends CompositionState = composeTraits<[
    ...traits,
    implementation
], "implementation">, cls extends TraitConstructor = TraitConstructor<s["params"], s["implemented"], s["statics"], s["abstractMethods"], s["abstractProps"], s["abstractStatics"]>>(...args: [...traits, implementation & ThisType<InstanceType<cls>>]) => cls;
export type TraitComposition = <traits extends TraitConstructor[], s extends CompositionState = composeTraits<traits, "abstract">>(...traits: conform<traits, s["validated"]>) => TraitConstructor<s["params"], s["implemented"], s["statics"], s["abstractMethods"], s["abstractProps"], s["abstractStatics"]>;
export declare const hasTrait: (traitClass: Constructor) => (o: unknown) => boolean;
export type TraitDeclaration = {
    abstractMethods?: object;
    abstractProps?: object;
    abstractStatics?: object;
    dynamicBase?: object;
};
/** @ts-ignore required to extend NoopBase */
export declare abstract class Trait<d extends TraitDeclaration = {}, abstractMethods extends object = d["abstractMethods"] & {}, abstractProps extends object = d["abstractProps"] & {}, abstractStatics extends object = d["abstractStatics"] & {}, dynamicBase extends object = d["dynamicBase"] & {}> extends NoopBase<abstractMethods & abstractProps & dynamicBase> {
    abstractMethods: abstractMethods;
    abstractProps: abstractProps;
    abstractStatic: abstractStatics;
    static get [Symbol.hasInstance](): (o: unknown) => boolean;
    traitsOf(): readonly TraitConstructor[];
}
export declare const compose: TraitComposition;
export declare const implement: TraitImplementation;
export type TraitConstructor<params extends array = any[], instance extends object = {}, statics = {}, abstractMethods extends object = {}, abstractProps extends object = {}, abstractStatics extends object = {}> = statics & (new (...args: params) => Trait<{
    abstractMethods: abstractMethods;
    abstractProps: abstractProps;
    abstractStatics: abstractStatics;
}> & instance);
type CompositionState = {
    validated: array;
    remaining: array;
    params: array;
    kind: TraitCompositionKind;
    implemented: object;
    abstractMethods: object;
    abstractProps: object;
    abstractStatics: object;
    statics: object;
};
export type TraitCompositionKind = "abstract" | "implementation";
export type composeTraits<traits extends array, kind extends TraitCompositionKind> = _compose<{
    validated: [];
    remaining: traits;
    kind: kind;
    params: [];
    implemented: {};
    abstractMethods: {};
    abstractProps: {};
    abstractStatics: {};
    statics: {};
}>;
type intersectImplementations<l, r> = {
    [k in keyof l]: k extends keyof r ? l[k] extends (...args: infer lArgs) => infer lReturn ? r[k] extends (...args: infer rArgs) => infer rReturn ? (...args: intersectParameters<lArgs, rArgs>) => lReturn & rReturn : l[k] & r[k] : l[k] & r[k] : l[k];
} & Omit<r, keyof l>;
type _compose<s extends CompositionState> = s["remaining"] extends (readonly [
    TraitConstructor<infer params, infer instance, infer statics, infer abstractMethods, infer abstractProps, infer abstractStatics>,
    ...infer tail
]) ? _compose<{
    validated: [...s["validated"], s["remaining"][0]];
    remaining: tail;
    kind: s["kind"];
    params: intersectParameters<s["params"], params>;
    implemented: intersectImplementations<s["implemented"], Omit<instance, keyof abstractMethods | keyof abstractProps>>;
    statics: intersectImplementations<s["statics"], Omit<statics, keyof abstractStatics>>;
    abstractMethods: intersectImplementations<s["abstractMethods"], abstractMethods>;
    abstractProps: intersectImplementations<s["abstractProps"], abstractProps>;
    abstractStatics: intersectImplementations<s["abstractStatics"], abstractStatics>;
}> : finalizeState<s>;
type finalizeState<s extends CompositionState> = satisfy<CompositionState, {
    params: s["params"];
    validated: s["validated"];
    remaining: s["remaining"];
    kind: s["kind"];
    implemented: show<s["implemented"]>;
    statics: show<Omit<s["statics"], keyof typeof Trait>>;
    abstractMethods: show<Omit<s["abstractMethods"], keyof s["implemented"]>>;
    abstractProps: show<Omit<s["abstractProps"], keyof s["implemented"]>>;
    abstractStatics: show<Omit<s["abstractStatics"], keyof s["statics"]>>;
}>;
export type implementationOf<s extends CompositionState> = s["abstractMethods"] & ({} extends s["abstractProps"] ? {} : {
    construct: (...args: s["params"]) => s["abstractProps"];
}) & ({} extends s["abstractStatics"] ? {} : {
    statics: s["abstractStatics"];
});
export {};
