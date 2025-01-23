import type { And, If, IsNever } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/utils";
import type { Never } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/never";
import type { ResolveOptions } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/resolve";
import type { Deserialized, IsSerialized } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/utils";
export declare type PrimitiveTypeId = "primitive";
export declare type Primitive<VALUE extends null | boolean | number | string, IS_SERIALIZED extends boolean = false, DESERIALIZED = never> = $Primitive<VALUE, IS_SERIALIZED, DESERIALIZED>;
export declare type $Primitive<VALUE, IS_SERIALIZED = false, DESERIALIZED = never> = If<IsNever<VALUE>, Never, {
    type: PrimitiveTypeId;
    value: VALUE;
    isSerialized: IS_SERIALIZED;
    deserialized: DESERIALIZED;
}>;
export declare type PrimitiveType = {
    type: PrimitiveTypeId;
    value: null | boolean | number | string;
    isSerialized: boolean;
    deserialized: unknown;
};
export declare type PrimitiveValue<META_PRIMITIVE extends PrimitiveType> = META_PRIMITIVE["value"];
export declare type ResolvePrimitive<META_PRIMITIVE extends PrimitiveType, OPTIONS extends ResolveOptions> = If<And<OPTIONS["deserialize"], IsSerialized<META_PRIMITIVE>>, Deserialized<META_PRIMITIVE>, PrimitiveValue<META_PRIMITIVE>>;
