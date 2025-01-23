import type { And, If } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/utils";
import type { ResolveOptions } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/resolve";
import type { Deserialized, IsSerialized } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/utils";
export declare type AnyTypeId = "any";
export declare type Any<IS_SERIALIZED extends boolean = false, DESERIALIZED = never> = {
    type: AnyTypeId;
    isSerialized: IS_SERIALIZED;
    deserialized: DESERIALIZED;
};
export declare type AnyType = {
    type: AnyTypeId;
    isSerialized: boolean;
    deserialized: unknown;
};
export declare type ResolveAny<META_ANY extends AnyType, OPTIONS extends ResolveOptions> = If<And<OPTIONS["deserialize"], IsSerialized<META_ANY>>, Deserialized<META_ANY>, unknown>;
