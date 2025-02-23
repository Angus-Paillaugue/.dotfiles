import type { Or } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/utils";
import type { AnyType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/any";
import type { ArrayType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/array";
import type { ConstType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/const";
import type { EnumType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/enum";
import type { Never, NeverType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/never";
import type { _$Object, IsObjectClosedOnResolve, ObjectOpenProps, ObjectRequiredKeys, ObjectType, ObjectValue, ObjectValues } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/object";
import type { PrimitiveType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/primitive";
import type { TupleType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/tuple";
import type { SerializableType, Type } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/type";
import type { UnionType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/union";
import type { IntersectConstToObject } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/const";
import type { IntersectEnumToObject } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/enum";
import type { $Intersect, Intersect } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection";
import type { DistributeIntersection } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/union";
import type { IntersectDeserialized, IntersectIsSerialized } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/utils";
export declare type IntersectObjectSerializationParams<VALUES extends Record<string, Type>, REQUIRED_KEYS extends string, OPEN_PROPS extends Type, CLOSE_ON_RESOLVE extends boolean, META_OBJECT extends ObjectType, SERIALIZABLE_META_TYPE extends SerializableType> = $MergeObjectPropsToSerializable<VALUES, REQUIRED_KEYS, OPEN_PROPS, CLOSE_ON_RESOLVE, META_OBJECT, SERIALIZABLE_META_TYPE>;
declare type $MergeObjectPropsToSerializable<VALUES, REQUIRED_KEYS, OPEN_PROPS, CLOSE_ON_RESOLVE, META_OBJECT extends ObjectType, SERIALIZABLE_META_TYPE extends SerializableType> = _$Object<VALUES, REQUIRED_KEYS, OPEN_PROPS, CLOSE_ON_RESOLVE, IntersectIsSerialized<META_OBJECT, SERIALIZABLE_META_TYPE>, IntersectDeserialized<META_OBJECT, SERIALIZABLE_META_TYPE>>;
export declare type IntersectObject<META_OBJECT extends ObjectType, META_TYPE> = META_TYPE extends Type ? META_TYPE extends NeverType ? META_TYPE : META_TYPE extends AnyType ? IntersectObjectSerializationParams<ObjectValues<META_OBJECT>, ObjectRequiredKeys<META_OBJECT>, ObjectOpenProps<META_OBJECT>, IsObjectClosedOnResolve<META_OBJECT>, META_OBJECT, META_TYPE> : META_TYPE extends ConstType ? IntersectConstToObject<META_TYPE, META_OBJECT> : META_TYPE extends EnumType ? IntersectEnumToObject<META_TYPE, META_OBJECT> : META_TYPE extends PrimitiveType ? Never : META_TYPE extends ArrayType ? Never : META_TYPE extends TupleType ? Never : META_TYPE extends ObjectType ? IntersectObjects<META_OBJECT, META_TYPE> : META_TYPE extends UnionType ? DistributeIntersection<META_TYPE, META_OBJECT> : Never : Never;
declare type IntersectObjects<META_OBJECT_A extends ObjectType, META_OBJECT_B extends ObjectType, INTERSECTED_VALUES extends Record<string, unknown> = IntersectObjectsValues<META_OBJECT_A, META_OBJECT_B>, INTERSECTED_OPEN_PROPS = Intersect<ObjectOpenProps<META_OBJECT_A>, ObjectOpenProps<META_OBJECT_B>>, INTERSECTED_CLOSE_ON_RESOLVE = Or<IsObjectClosedOnResolve<META_OBJECT_A>, IsObjectClosedOnResolve<META_OBJECT_B>>> = $MergeObjectPropsToSerializable<{
    [KEY in keyof INTERSECTED_VALUES]: INTERSECTED_VALUES[KEY];
}, ObjectRequiredKeys<META_OBJECT_A> | ObjectRequiredKeys<META_OBJECT_B>, INTERSECTED_OPEN_PROPS, INTERSECTED_CLOSE_ON_RESOLVE, META_OBJECT_A, META_OBJECT_B>;
declare type IntersectObjectsValues<META_OBJECT_A extends ObjectType, META_OBJECT_B extends ObjectType> = {
    [KEY in Extract<keyof ObjectValues<META_OBJECT_A> | keyof ObjectValues<META_OBJECT_B>, string>]: $Intersect<ObjectValue<META_OBJECT_A, KEY>, ObjectValue<META_OBJECT_B, KEY>>;
};
export {};
