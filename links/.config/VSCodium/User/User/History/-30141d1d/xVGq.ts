import type { And, If, IsNever } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/utils";
import type { Never } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/never";
import type { ResolveOptions } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/resolve";
import type { Deserialized, IsSerialized } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/utils";
export declare type ConstTypeId = "const";
export declare type Const<VALUE, IS_SERIALIZED extends boolean = false, DESERIALIZED = never> = If<IsNever<VALUE>, Never, {
    type: ConstTypeId;
    value: VALUE;
    isSerialized: IS_SERIALIZED;
    deserialized: DESERIALIZED;
}>;
export declare type ConstType = {
    type: ConstTypeId;
    value: unknown;
    isSerialized: boolean;
    deserialized: unknown;
};
export declare type ConstValue<META_CONST extends ConstType> = META_CONST["value"];
export declare type ResolveConst<META_CONST extends ConstType, OPTIONS extends ResolveOptions> = If<And<OPTIONS["deserialize"], IsSerialized<META_CONST>>, Deserialized<META_CONST>, ConstValue<META_CONST>>;
