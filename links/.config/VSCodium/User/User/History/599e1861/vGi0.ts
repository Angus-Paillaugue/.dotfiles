import type { M } from "ts-algebra";
import type { JSONSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/definitions";
import type { ParseSchema, ParseSchemaOptions } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema";
import type { MergeSubSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema/utils";
export type AllOfSchema = JSONSchema & Readonly<{
    allOf: readonly JSONSchema[];
}>;
export type ParseAllOfSchema<ALL_OF_SCHEMA extends AllOfSchema, OPTIONS extends ParseSchemaOptions> = RecurseOnAllOfSchema<ALL_OF_SCHEMA["allOf"], ALL_OF_SCHEMA, OPTIONS, ParseSchema<Omit<ALL_OF_SCHEMA, "allOf">, OPTIONS>>;
type RecurseOnAllOfSchema<SUB_SCHEMAS extends readonly JSONSchema[], ROOT_ALL_OF_SCHEMA extends AllOfSchema, OPTIONS extends ParseSchemaOptions, PARSED_ROOT_ALL_OF_SCHEMA> = SUB_SCHEMAS extends readonly [
    infer SUB_SCHEMAS_HEAD,
    ...infer SUB_SCHEMAS_TAIL
] ? SUB_SCHEMAS_HEAD extends JSONSchema ? SUB_SCHEMAS_TAIL extends readonly JSONSchema[] ? RecurseOnAllOfSchema<SUB_SCHEMAS_TAIL, ROOT_ALL_OF_SCHEMA, OPTIONS, M.$Intersect<ParseSchema<MergeSubSchema<Omit<ROOT_ALL_OF_SCHEMA, "allOf">, SUB_SCHEMAS_HEAD>, OPTIONS>, PARSED_ROOT_ALL_OF_SCHEMA>> : never : never : PARSED_ROOT_ALL_OF_SCHEMA;
export {};
