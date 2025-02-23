import type { M } from "ts-algebra";
import type { JSONSchema, JSONSchemaType } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/definitions";
import type { ParseSchema, ParseSchemaOptions } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema";
export type MultipleTypesSchema = JSONSchema & Readonly<{
    type: readonly JSONSchemaType[];
}>;
export type ParseMultipleTypesSchema<MULTI_TYPE_SCHEMA extends MultipleTypesSchema, OPTIONS extends ParseSchemaOptions> = M.$Union<RecurseOnMixedSchema<MULTI_TYPE_SCHEMA["type"], MULTI_TYPE_SCHEMA, OPTIONS>>;
type RecurseOnMixedSchema<TYPES extends readonly JSONSchemaType[], ROOT_MULTI_TYPE_SCHEMA extends MultipleTypesSchema, OPTIONS extends ParseSchemaOptions, RESULT = never> = TYPES extends readonly [infer TYPES_HEAD, ...infer TYPES_TAIL] ? TYPES_HEAD extends JSONSchemaType ? TYPES_TAIL extends readonly JSONSchemaType[] ? RecurseOnMixedSchema<TYPES_TAIL, ROOT_MULTI_TYPE_SCHEMA, OPTIONS, RESULT | ParseSchema<Omit<ROOT_MULTI_TYPE_SCHEMA, "type"> & {
    type: TYPES_HEAD;
}, OPTIONS>> : never : never : RESULT;
export {};
