import type { If, Or } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/utils";
import type { SerializableType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/type";
import type { Deserialized, IsSerialized } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/utils";
export declare type IntersectIsSerialized<SERIALIZABLE_META_TYPE_A extends SerializableType, SERIALIZABLE_META_TYPE_B extends SerializableType> = Or<IsSerialized<SERIALIZABLE_META_TYPE_A>, IsSerialized<SERIALIZABLE_META_TYPE_B>>;
export declare type IntersectDeserialized<SERIALIZABLE_META_TYPE_A extends SerializableType, SERIALIZABLE_META_TYPE_B extends SerializableType> = If<IsSerialized<SERIALIZABLE_META_TYPE_A>, If<IsSerialized<SERIALIZABLE_META_TYPE_B>, Deserialized<SERIALIZABLE_META_TYPE_A> & Deserialized<SERIALIZABLE_META_TYPE_B>, Deserialized<SERIALIZABLE_META_TYPE_A>>, If<IsSerialized<SERIALIZABLE_META_TYPE_B>, Deserialized<SERIALIZABLE_META_TYPE_B>>>;
