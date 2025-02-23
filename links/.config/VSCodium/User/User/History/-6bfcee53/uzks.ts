import type { And, If, Prettify } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/utils";
import type { Any } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/any";
import type { NeverType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/never";
import type { Resolve, ResolveOptions } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/resolve";
import type { Type } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/type";
import type { Deserialized, IsSerialized } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/utils";
export declare type ArrayTypeId = "array";
export declare type _Array<VALUES extends Type = Any, IS_SERIALIZED extends boolean = false, DESERIALIZED = never> = _$Array<VALUES, IS_SERIALIZED, DESERIALIZED>;
export declare type _$Array<VALUES = Any, IS_SERIALIZED = false, DESERIALIZED = never> = {
    type: ArrayTypeId;
    values: VALUES;
    isSerialized: IS_SERIALIZED;
    deserialized: DESERIALIZED;
};
export declare type ArrayType = {
    type: ArrayTypeId;
    values: Type;
    isSerialized: boolean;
    deserialized: unknown;
};
export declare type ArrayValues<META_ARRAY extends ArrayType> = META_ARRAY["values"];
export declare type ResolveArray<META_ARRAY extends ArrayType, OPTIONS extends ResolveOptions> = If<And<OPTIONS["deserialize"], IsSerialized<META_ARRAY>>, Deserialized<META_ARRAY>, ArrayValues<META_ARRAY> extends NeverType ? [] : Prettify<Resolve<ArrayValues<META_ARRAY>, OPTIONS>[]>>;
