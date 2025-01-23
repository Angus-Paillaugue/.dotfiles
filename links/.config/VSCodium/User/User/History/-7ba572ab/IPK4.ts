import type { ParseSchemaOptions } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema";
import type { ReferencingSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema/references";
import type { ParseReference } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema/references/utils";
export type ParseInternalReferenceSchema<REFERENCING_SCHEMA extends ReferencingSchema, OPTIONS extends ParseSchemaOptions, PATH extends string> = ParseReference<Omit<REFERENCING_SCHEMA, "$ref">, OPTIONS, OPTIONS["rootSchema"], PATH>;
