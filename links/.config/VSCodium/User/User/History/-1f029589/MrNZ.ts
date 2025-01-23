import type { M } from "ts-algebra";
import type { ExtendedJSONSchema, FromExtendedSchemaOptions, FromSchemaDefaultOptions, FromSchemaOptions, JSONSchema, JSONSchemaExtension, UnextendJSONSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/definitions";
import type { ParseOptions } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-options";
import type { ParseSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema";
export type { ExtendedJSONSchema, DeserializationPattern, FromSchemaOptions, FromExtendedSchemaOptions, FromSchemaDefaultOptions, JSONSchemaExtension, JSONSchema, } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/definitions";
export type { $Compiler, Compiler, $Validator, Validator } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/utils";
export { wrapCompilerAsTypeGuard, wrapValidatorAsTypeGuard, asConst, } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/utils";
export type FromSchema<SCHEMA extends JSONSchema, OPTIONS extends FromSchemaOptions = FromSchemaDefaultOptions> = M.$Resolve<ParseSchema<SCHEMA, ParseOptions<SCHEMA, OPTIONS>>>;
export type FromExtendedSchema<EXTENSION extends JSONSchemaExtension, SCHEMA extends ExtendedJSONSchema<EXTENSION>, OPTIONS extends FromExtendedSchemaOptions<EXTENSION> = FromSchemaDefaultOptions, UNEXTENDED_SCHEMA = UnextendJSONSchema<EXTENSION, SCHEMA>> = UNEXTENDED_SCHEMA extends JSONSchema ? FromSchema<UNEXTENDED_SCHEMA, OPTIONS> : never;
