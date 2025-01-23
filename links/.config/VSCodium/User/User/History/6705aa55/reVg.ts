import type { SerializableType } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/meta-types/type";
export declare type IsSerialized<SERIALIZABLE_META_TYPE extends SerializableType> = SERIALIZABLE_META_TYPE["isSerialized"];
export declare type Deserialized<SERIALIZABLE_META_TYPE extends SerializableType> = SERIALIZABLE_META_TYPE["deserialized"];
