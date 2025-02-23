import type { M } from "ts-algebra";
import type { JSONSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/definitions";
import type { ParseSchema, ParseSchemaOptions } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema";
import type { MergeSubSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema/utils";
export type IfThenElseSchema = JSONSchema & {
    if: JSONSchema;
    then?: JSONSchema;
    else?: JSONSchema;
};
export type ParseIfThenElseSchema<IF_THEN_ELSE_SCHEMA extends IfThenElseSchema, OPTIONS extends ParseSchemaOptions, REST_SCHEMA extends JSONSchema = Omit<IF_THEN_ELSE_SCHEMA, "if" | "then" | "else">, IF_SCHEMA extends JSONSchema = MergeSubSchema<REST_SCHEMA, IF_THEN_ELSE_SCHEMA["if"]>, PARSED_THEN_SCHEMA = IF_THEN_ELSE_SCHEMA extends {
    then: JSONSchema;
} ? M.$Intersect<ParseSchema<IF_SCHEMA, OPTIONS>, ParseSchema<MergeSubSchema<REST_SCHEMA, IF_THEN_ELSE_SCHEMA["then"]>, OPTIONS>> : ParseSchema<IF_SCHEMA, OPTIONS>, PARSED_ELSE_SCHEMA = IF_THEN_ELSE_SCHEMA extends {
    else: JSONSchema;
} ? M.$Intersect<M.$Exclude<ParseSchema<REST_SCHEMA, OPTIONS>, ParseSchema<IF_SCHEMA, OPTIONS>>, ParseSchema<MergeSubSchema<REST_SCHEMA, IF_THEN_ELSE_SCHEMA["else"]>, OPTIONS>> : M.$Exclude<ParseSchema<REST_SCHEMA, OPTIONS>, ParseSchema<IF_SCHEMA, OPTIONS>>> = M.$Intersect<M.$Union<PARSED_THEN_SCHEMA | PARSED_ELSE_SCHEMA>, ParseSchema<REST_SCHEMA, OPTIONS>>;
