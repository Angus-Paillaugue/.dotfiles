import type { M } from "ts-algebra";
import type { JSONSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/definitions";
import type { ParseSchema, ParseSchemaOptions } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema";
import type { MergeSubSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema/utils";
export type AnyOfSchema = JSONSchema & Readonly<{
    anyOf: readonly JSONSchema[];
}>;
export type ParseAnyOfSchema<ANY_OF_SCHEMA extends AnyOfSchema, OPTIONS extends ParseSchemaOptions> = M.$Union<RecurseOnAnyOfSchema<ANY_OF_SCHEMA["anyOf"], ANY_OF_SCHEMA, OPTIONS>>;
type RecurseOnAnyOfSchema<SUB_SCHEMAS extends readonly JSONSchema[], ROOT_ANY_OF_SCHEMA extends AnyOfSchema, OPTIONS extends ParseSchemaOptions, RESULT = never> = SUB_SCHEMAS extends readonly [
    infer SUB_SCHEMAS_HEAD,
    ...infer SUB_SCHEMAS_TAIL
] ? SUB_SCHEMAS_HEAD extends JSONSchema ? SUB_SCHEMAS_TAIL extends readonly JSONSchema[] ? RecurseOnAnyOfSchema<SUB_SCHEMAS_TAIL, ROOT_ANY_OF_SCHEMA, OPTIONS, RESULT | M.$Intersect<ParseSchema<Omit<ROOT_ANY_OF_SCHEMA, "anyOf">, OPTIONS>, ParseSchema<MergeSubSchema<Omit<ROOT_ANY_OF_SCHEMA, "anyOf">, SUB_SCHEMAS_HEAD>, OPTIONS>>> : never : never : RESULT;
export {};
