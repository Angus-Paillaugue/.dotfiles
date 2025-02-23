import type { DoesExtend, If, IsNever } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/utils";
import type { Never, NeverType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/never";
import type { $Resolve, ResolveOptions } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/resolve";
import type { Type } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/type";
export declare type UnionTypeId = "union";
export declare type Union<VALUES extends Type> = $Union<VALUES>;
export declare type $Union<VALUES> = If<IsNever<VALUES>, Never, DoesExtend<VALUES, NeverType> extends true ? Never : {
    type: UnionTypeId;
    values: VALUES;
}>;
export declare type UnionType = {
    type: UnionTypeId;
    values: Type;
};
export declare type UnionValues<META_UNION extends UnionType> = META_UNION["values"];
export declare type ResolveUnion<META_UNION extends UnionType, OPTIONS extends ResolveOptions> = RecurseOnUnion<UnionValues<META_UNION>, OPTIONS>;
declare type RecurseOnUnion<VALUES extends Type, OPTIONS extends ResolveOptions> = VALUES extends infer META_TYPE ? $Resolve<META_TYPE, OPTIONS> : never;
export {};
