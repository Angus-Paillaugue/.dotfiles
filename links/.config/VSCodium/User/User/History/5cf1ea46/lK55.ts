import type { M } from "ts-algebra";
import type { JSONSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/definitions";
import type { ParseSchema, ParseSchemaOptions } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema";
import type { MergeSubSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema/utils";
export type NotSchema = JSONSchema & Readonly<{
    not: JSONSchema;
}>;
type AllTypes = M.Union<M.Primitive<null> | M.Primitive<boolean> | M.Primitive<number> | M.Primitive<string> | M.Array | M.Object<{}, never, M.Any>>;
export type ParseNotSchema<NOT_SCHEMA extends NotSchema, OPTIONS extends ParseSchemaOptions, PARSED_REST_SCHEMA = ParseSchema<Omit<NOT_SCHEMA, "not">, OPTIONS>, EXCLUSION = M.$Exclude<PARSED_REST_SCHEMA extends M.AnyType ? M.$Intersect<AllTypes, PARSED_REST_SCHEMA> : PARSED_REST_SCHEMA, ParseSchema<MergeSubSchema<Omit<NOT_SCHEMA, "not">, NOT_SCHEMA["not"]>, OPTIONS>>> = EXCLUSION extends M.Never ? PARSED_REST_SCHEMA : EXCLUSION;
export {};
