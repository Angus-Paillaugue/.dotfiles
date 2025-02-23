import type { And, DoesExtend, If } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/utils";
import type { AnyType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/any";
import type { ArrayType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/array";
import type { ConstType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/const";
import type { EnumType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/enum";
import type { Never, NeverType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/never";
import type { ObjectType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/object";
import type { Primitive, PrimitiveType, PrimitiveValue } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/primitive";
import type { TupleType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/tuple";
import type { SerializableType, Type } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/type";
import type { UnionType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/union";
import type { IntersectConstToPrimitive } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/const";
import type { IntersectEnumToPrimitive } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/enum";
import type { DistributeIntersection } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/union";
import type { IntersectDeserialized, IntersectIsSerialized } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/intersection/utils";
export declare type IntersectPrimitiveSerializationParams<META_PRIMITIVE extends PrimitiveType, SERIALIZABLE_META_TYPE extends SerializableType> = Primitive<PrimitiveValue<META_PRIMITIVE>, IntersectIsSerialized<META_PRIMITIVE, SERIALIZABLE_META_TYPE>, IntersectDeserialized<META_PRIMITIVE, SERIALIZABLE_META_TYPE>>;
export declare type IntersectPrimitive<META_PRIMITIVE extends PrimitiveType, META_TYPE> = META_TYPE extends Type ? META_TYPE extends NeverType ? META_TYPE : META_TYPE extends AnyType ? IntersectPrimitiveSerializationParams<META_PRIMITIVE, META_TYPE> : META_TYPE extends ConstType ? IntersectConstToPrimitive<META_TYPE, META_PRIMITIVE> : META_TYPE extends EnumType ? IntersectEnumToPrimitive<META_TYPE, META_PRIMITIVE> : META_TYPE extends PrimitiveType ? If<And<DoesExtend<PrimitiveValue<META_PRIMITIVE>, PrimitiveValue<META_TYPE>>, DoesExtend<PrimitiveValue<META_TYPE>, PrimitiveValue<META_PRIMITIVE>>>, IntersectPrimitiveSerializationParams<META_PRIMITIVE, META_TYPE>, Never> : META_TYPE extends ArrayType ? Never : META_TYPE extends TupleType ? Never : META_TYPE extends ObjectType ? Never : META_TYPE extends UnionType ? DistributeIntersection<META_TYPE, META_PRIMITIVE> : Never : Never;
