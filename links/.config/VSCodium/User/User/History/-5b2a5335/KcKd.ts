import type { M } from "ts-algebra";
import type { JSONSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/definitions";
import type { DeepGet, Split, Tail } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/type-utils";
import type { ParseSchema, ParseSchemaOptions } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema";
import type { MergeSubSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema/utils";
export type ParseReference<SCHEMA extends JSONSchema, OPTIONS extends ParseSchemaOptions, REFERENCE_SOURCE extends JSONSchema, PATH_IN_SOURCE extends string | undefined, MATCHING_REFERENCE extends JSONSchema = PATH_IN_SOURCE extends string ? DeepGet<REFERENCE_SOURCE, Tail<Split<PATH_IN_SOURCE, "/">>, false> : REFERENCE_SOURCE> = M.$Intersect<ParseSchema<MATCHING_REFERENCE, OPTIONS>, ParseSchema<MergeSubSchema<MATCHING_REFERENCE, SCHEMA>, OPTIONS>>;
