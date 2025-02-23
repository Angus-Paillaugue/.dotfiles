import type { Any, AnyType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/any";
import type { ArrayType, ArrayValues } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/array";
import type { ConstType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/const";
import type { EnumType, EnumValues } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/enum";
import type { Never, NeverType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/never";
import type { IsObjectClosedOnResolve, ObjectOpenProps, ObjectRequiredKeys, ObjectType, ObjectValues } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/object";
import type { PrimitiveType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/primitive";
import type { TupleOpenProps, TupleType, TupleValues } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/tuple";
import type { Type } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/type";
import type { UnionType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/union";
import type { IntersectArraySerializationParams } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/array";
import type { IntersectConstSerializationParams } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/const";
import type { IntersectEnumSerializationParams } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/enum";
import type { IntersectObjectSerializationParams } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/object";
import type { IntersectPrimitiveSerializationParams } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/primitive";
import type { IntersectTupleSerializationParams } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/tuple";
import type { DistributeIntersection } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/union";
import type { IntersectDeserialized, IntersectIsSerialized } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/utils";
export declare type IntersectAny<META_ANY extends AnyType, META_TYPE> = META_TYPE extends Type ? META_TYPE extends NeverType ? META_TYPE : META_TYPE extends AnyType ? Any<IntersectIsSerialized<META_ANY, META_TYPE>, IntersectDeserialized<META_ANY, META_TYPE>> : META_TYPE extends ConstType ? IntersectConstSerializationParams<META_TYPE, META_ANY> : META_TYPE extends EnumType ? IntersectEnumSerializationParams<EnumValues<META_TYPE>, META_TYPE, META_ANY> : META_TYPE extends PrimitiveType ? IntersectPrimitiveSerializationParams<META_TYPE, META_ANY> : META_TYPE extends ArrayType ? IntersectArraySerializationParams<ArrayValues<META_TYPE>, META_TYPE, META_ANY> : META_TYPE extends TupleType ? IntersectTupleSerializationParams<TupleValues<META_TYPE>, TupleOpenProps<META_TYPE>, META_TYPE, META_ANY> : META_TYPE extends ObjectType ? IntersectObjectSerializationParams<ObjectValues<META_TYPE>, ObjectRequiredKeys<META_TYPE>, ObjectOpenProps<META_TYPE>, IsObjectClosedOnResolve<META_TYPE>, META_TYPE, META_ANY> : META_TYPE extends UnionType ? DistributeIntersection<META_TYPE, META_ANY> : Never : Never;
