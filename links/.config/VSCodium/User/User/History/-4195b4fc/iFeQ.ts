import type { If, IsNever, IsObject } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/utils";
import type { AnyType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/any";
import type { ArrayType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/array";
import type { Const, ConstType, ConstValue } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/const";
import type { EnumType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/enum";
import type { Never, NeverType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/never";
import type { IsObjectOpen, ObjectOpenProps, ObjectRequiredKeys, ObjectType, ObjectValues } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/object";
import type { PrimitiveType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/primitive";
import type { Resolve } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/resolve";
import type { TupleType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/tuple";
import type { Type } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/type";
import type { UnionType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/union";
import type { _Exclude } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/exclusion";
import type { ExcludeUnion } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/exclusion/union";
export declare type ExcludeFromConst<META_CONST extends ConstType, META_TYPE> = META_TYPE extends Type ? META_TYPE extends NeverType ? META_CONST : META_TYPE extends AnyType ? Never : META_TYPE extends ConstType ? CheckNotExtendsResolved<META_CONST, META_TYPE> : META_TYPE extends EnumType ? CheckNotExtendsResolved<META_CONST, META_TYPE> : META_TYPE extends PrimitiveType ? CheckNotExtendsResolved<META_CONST, META_TYPE> : META_TYPE extends ArrayType ? CheckNotExtendsResolved<META_CONST, META_TYPE> : META_TYPE extends TupleType ? CheckNotExtendsResolved<META_CONST, META_TYPE> : META_TYPE extends ObjectType ? ExcludeObject<META_CONST, META_TYPE> : META_TYPE extends UnionType ? ExcludeUnion<META_CONST, META_TYPE> : Never : Never;
declare type CheckNotExtendsResolved<META_CONST extends ConstType, META_TYPE extends Type> = ConstValue<META_CONST> extends Resolve<META_TYPE, {
    deserialize: false;
}> ? Never : META_CONST;
declare type ExcludeObject<META_CONST extends ConstType, META_OBJECT extends ObjectType> = If<IsObject<ConstValue<META_CONST>>, ObjectRequiredKeys<META_OBJECT> extends keyof ConstValue<META_CONST> ? ExcludeObjectFromConst<META_CONST, META_OBJECT> : META_CONST, META_CONST>;
declare type ExcludeObjectFromConst<META_CONST extends ConstType, META_OBJECT extends ObjectType, EXCLUDED_CONST_VALUES = ExcludeConstValues<ConstValue<META_CONST>, META_OBJECT>> = If<IsNever<RepresentableKeys<EXCLUDED_CONST_VALUES>>, Never, META_CONST>;
declare type ExcludeConstValues<VALUE, META_OBJECT extends ObjectType> = {
    [KEY in keyof VALUE]: KEY extends keyof ObjectValues<META_OBJECT> ? _Exclude<Const<VALUE[KEY]>, ObjectValues<META_OBJECT>[KEY]> : IsObjectOpen<META_OBJECT> extends true ? _Exclude<Const<VALUE[KEY]>, ObjectOpenProps<META_OBJECT>> : Const<VALUE[KEY]>;
};
declare type RepresentableKeys<VALUES> = {
    [KEY in keyof VALUES]: VALUES[KEY] extends Never ? never : KEY;
}[keyof VALUES];
export {};
