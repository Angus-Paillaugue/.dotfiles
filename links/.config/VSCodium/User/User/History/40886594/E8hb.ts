import type { M } from "ts-algebra";
import type { JSONSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/definitions";
import type { Writable } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/type-utils";
import type { ParseSchema, ParseSchemaOptions } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema";
export type EnumSchema = JSONSchema & Readonly<{
    enum: readonly unknown[];
}>;
export type ParseEnumSchema<ENUM_SCHEMA extends EnumSchema, OPTIONS extends ParseSchemaOptions> = M.$Intersect<ParseEnum<ENUM_SCHEMA>, ParseSchema<Omit<ENUM_SCHEMA, "enum">, OPTIONS>>;
type ParseEnum<ENUM_SCHEMA extends EnumSchema> = M.Enum<Writable<ENUM_SCHEMA["enum"][number]>>;
export {};
