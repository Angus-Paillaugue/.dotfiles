import type { If, IsNever, UnionLast } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/utils";
import type { $Intersect } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection";
import type { $Union, UnionType, UnionValues } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/union";
import type { _$Exclude } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/exclusion";
export declare type ExcludeFromUnion<META_UNION extends UnionType, META_TYPE> = $Union<UnionValues<META_UNION> extends infer META_UNION_VALUE ? _$Exclude<META_UNION_VALUE, META_TYPE> : never>;
export declare type ExcludeUnion<META_TYPE, META_UNION extends UnionType> = If<IsNever<UnionValues<META_UNION>>, META_TYPE, RecurseOnUnionValues<META_TYPE, UnionLast<UnionValues<META_UNION>>, META_UNION>>;
declare type RecurseOnUnionValues<META_TYPE, META_UNION_VALUE, META_UNION extends UnionType> = $Intersect<_$Exclude<META_TYPE, META_UNION_VALUE>, _$Exclude<META_TYPE, $Union<Exclude<UnionValues<META_UNION>, META_UNION_VALUE>>>>;
export {};
