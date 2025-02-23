import type { M } from "ts-algebra";
import type { JSONSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/definitions";
import type { Writable } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/type-utils";
import type { ParseSchema, ParseSchemaOptions } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema";
export type ConstSchema = JSONSchema & Readonly<{
    const: unknown;
}>;
export type ParseConstSchema<CONST_SCHEMA extends ConstSchema, OPTIONS extends ParseSchemaOptions> = M.$Intersect<ParseConst<CONST_SCHEMA>, ParseSchema<Omit<CONST_SCHEMA, "const">, OPTIONS>>;
type ParseConst<CONST_SCHEMA extends ConstSchema> = M.Const<Writable<CONST_SCHEMA["const"]>>;
export {};
