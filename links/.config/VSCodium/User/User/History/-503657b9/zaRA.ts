import type { And, If, IsNever } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/utils";
import type { Never } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/never";
import type { ResolveOptions } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/resolve";
import type { Deserialized, IsSerialized } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/utils";
export declare type EnumTypeId = "enum";
export declare type Enum<VALUES, IS_SERIALIZED extends boolean = false, DESERIALIZED = never> = If<IsNever<VALUES>, Never, {
    type: EnumTypeId;
    values: VALUES;
    isSerialized: IS_SERIALIZED;
    deserialized: DESERIALIZED;
}>;
export declare type EnumType = {
    type: EnumTypeId;
    values: unknown;
    isSerialized: boolean;
    deserialized: unknown;
};
export declare type EnumValues<META_ENUM extends EnumType> = META_ENUM["values"];
export declare type ResolveEnum<META_ENUM extends EnumType, OPTIONS extends ResolveOptions> = If<And<OPTIONS["deserialize"], IsSerialized<META_ENUM>>, Deserialized<META_ENUM>, EnumValues<META_ENUM>>;
