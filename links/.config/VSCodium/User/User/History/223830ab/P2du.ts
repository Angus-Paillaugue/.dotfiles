import type { If, IsNever, IsObject } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/utils";
import type { AnyType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/any";
import type { ArrayType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/array";
import type { Const, ConstType, ConstValue } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/const";
import type { EnumType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/enum";
import type { Never, NeverType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/never";
import type { ObjectRequiredKeys, ObjectType, ObjectValue } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/object";
import type { PrimitiveType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/primitive";
import type { Resolve } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/resolve";
import type { TupleType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/tuple";
import type { SerializableType, Type } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/type";
import type { UnionType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/union";
import type { Intersect } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection";
import type { DistributeIntersection } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/union";
import type { IntersectDeserialized, IntersectIsSerialized } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/utils";
export declare type IntersectConstSerializationParams<META_CONST extends ConstType, SERIALIZABLE_META_TYPE extends SerializableType> = Const<ConstValue<META_CONST>, IntersectIsSerialized<META_CONST, SERIALIZABLE_META_TYPE>, IntersectDeserialized<META_CONST, SERIALIZABLE_META_TYPE>>;
export declare type IntersectConst<META_CONST extends ConstType, META_TYPE> = META_TYPE extends Type ? META_TYPE extends NeverType ? META_TYPE : META_TYPE extends AnyType ? IntersectConstSerializationParams<META_CONST, META_TYPE> : META_TYPE extends ConstType ? CheckExtendsResolved<META_CONST, META_TYPE> : META_TYPE extends EnumType ? IntersectConstToEnum<META_CONST, META_TYPE> : META_TYPE extends PrimitiveType ? IntersectConstToPrimitive<META_CONST, META_TYPE> : META_TYPE extends ArrayType ? IntersectConstToArray<META_CONST, META_TYPE> : META_TYPE extends TupleType ? IntersectConstToTuple<META_CONST, META_TYPE> : META_TYPE extends ObjectType ? IntersectConstToObject<META_CONST, META_TYPE> : META_TYPE extends UnionType ? DistributeIntersection<META_TYPE, META_CONST> : Never : Never;
declare type CheckExtendsResolved<META_CONST extends ConstType, SERIALIZABLE_META_TYPE extends SerializableType> = ConstValue<META_CONST> extends Resolve<SERIALIZABLE_META_TYPE, {
    deserialize: false;
}> ? IntersectConstSerializationParams<META_CONST, SERIALIZABLE_META_TYPE> : Never;
export declare type IntersectConstToEnum<META_CONST extends ConstType, META_ENUM extends EnumType> = CheckExtendsResolved<META_CONST, META_ENUM>;
export declare type IntersectConstToPrimitive<META_CONST extends ConstType, META_PRIMITIVE extends PrimitiveType> = CheckExtendsResolved<META_CONST, META_PRIMITIVE>;
export declare type IntersectConstToArray<META_CONST extends ConstType, META_ARRAY extends ArrayType> = CheckExtendsResolved<META_CONST, META_ARRAY>;
export declare type IntersectConstToTuple<META_CONST extends ConstType, META_TUPLE extends TupleType> = CheckExtendsResolved<META_CONST, META_TUPLE>;
export declare type IntersectConstToObject<META_CONST extends ConstType, META_OBJECT extends ObjectType> = If<IsObject<ConstValue<META_CONST>>, IntersectObjectConstToObject<META_CONST, META_OBJECT>, Never>;
declare type IntersectObjectConstToObject<META_CONST extends ConstType, META_OBJECT extends ObjectType, INTERSECTED_META_OBJECT = IntersectConstValuesToObjectValues<ConstValue<META_CONST>, META_OBJECT>> = If<IsNever<NeverKeys<INTERSECTED_META_OBJECT>>, IntersectConstSerializationParams<META_CONST, META_OBJECT>, Never>;
declare type IntersectConstValuesToObjectValues<CONST_VALUE, META_OBJECT extends ObjectType> = {
    [KEY in Extract<keyof CONST_VALUE | ObjectRequiredKeys<META_OBJECT>, string>]: KEY extends keyof CONST_VALUE ? Intersect<Const<CONST_VALUE[KEY]>, ObjectValue<META_OBJECT, KEY>> : Never;
};
declare type NeverKeys<META_OBJECT> = {
    [KEY in keyof META_OBJECT]: META_OBJECT[KEY] extends Never ? KEY : never;
}[keyof META_OBJECT];
export {};
