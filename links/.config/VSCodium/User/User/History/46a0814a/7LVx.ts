import type { JSONSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/definitions";
import type { Split } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/type-utils/split";
import type { ParseSchemaOptions } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema";
import type { ParseExternalReferenceSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema/references/external";
import type { ParseInternalReferenceSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema/references/internal";
export type ReferencingSchema = JSONSchema & {
    $ref: string;
};
export type ParseReferenceSchema<REFERENCING_SCHEMA extends ReferencingSchema, OPTIONS extends ParseSchemaOptions, REFERENCE_ID_AND_PATH extends string[] = Split<REFERENCING_SCHEMA["$ref"], "#">> = REFERENCE_ID_AND_PATH[0] extends "" ? ParseInternalReferenceSchema<REFERENCING_SCHEMA, OPTIONS, REFERENCE_ID_AND_PATH[1]> : ParseExternalReferenceSchema<REFERENCING_SCHEMA, OPTIONS, REFERENCE_ID_AND_PATH[0], REFERENCE_ID_AND_PATH[1]>;
