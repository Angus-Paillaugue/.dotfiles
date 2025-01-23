import type { M } from "ts-algebra";
import type { JSONSchema, JSONSchemaType } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/definitions";
import type { ArrayOrTupleSchema, ParseArrayOrTupleSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema/array";
import type { ParseSchemaOptions } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema";
import type { ObjectSchema, ParseObjectSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema/object";
export type SingleTypeSchema = JSONSchema & Readonly<{
    type: JSONSchemaType;
}>;
export type ParseSingleTypeSchema<SINGLE_TYPE_SCHEMA extends SingleTypeSchema, OPTIONS extends ParseSchemaOptions> = SINGLE_TYPE_SCHEMA extends Readonly<{
    type: "null";
}> ? M.Primitive<null> : SINGLE_TYPE_SCHEMA extends Readonly<{
    type: "boolean";
}> ? M.Primitive<boolean> : SINGLE_TYPE_SCHEMA extends Readonly<{
    type: "integer";
}> ? M.Primitive<number> : SINGLE_TYPE_SCHEMA extends Readonly<{
    type: "number";
}> ? M.Primitive<number> : SINGLE_TYPE_SCHEMA extends Readonly<{
    type: "string";
}> ? M.Primitive<string> : SINGLE_TYPE_SCHEMA extends ArrayOrTupleSchema ? ParseArrayOrTupleSchema<SINGLE_TYPE_SCHEMA, OPTIONS> : SINGLE_TYPE_SCHEMA extends ObjectSchema ? ParseObjectSchema<SINGLE_TYPE_SCHEMA, OPTIONS> : M.Never;
