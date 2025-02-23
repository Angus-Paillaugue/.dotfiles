import type { M } from "ts-algebra";
import type { DeserializationPattern, JSONSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/definitions";
import type { And, DoesExtend } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/type-utils";
import type { AllOfSchema, ParseAllOfSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema/allOf";
import type { AnyOfSchema, ParseAnyOfSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema/anyOf";
import type { ConstSchema, ParseConstSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema/const";
import type { DeserializeSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema/deserialize";
import type { EnumSchema, ParseEnumSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema/enum";
import type { IfThenElseSchema, ParseIfThenElseSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema/ifThenElse";
import type { MultipleTypesSchema, ParseMultipleTypesSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema/multipleTypes";
import type { NotSchema, ParseNotSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema/not";
import type { NullableSchema, ParseNullableSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema/nullable";
import type { OneOfSchema, ParseOneOfSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema/oneOf";
import type { ParseReferenceSchema, ReferencingSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema/references";
import type { ParseSingleTypeSchema, SingleTypeSchema } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/parse-schema/singleType";
export type ParseSchemaOptions = {
    parseNotKeyword: boolean;
    parseIfThenElseKeywords: boolean;
    keepDefaultedPropertiesOptional: boolean;
    rootSchema: JSONSchema;
    references: Record<string, JSONSchema>;
    deserialize: DeserializationPattern[] | false;
};
export type ParseSchema<SCHEMA extends JSONSchema, OPTIONS extends ParseSchemaOptions, RESULT = JSONSchema extends SCHEMA ? M.Any : SCHEMA extends true | string ? M.Any : SCHEMA extends false ? M.Never : SCHEMA extends NullableSchema ? ParseNullableSchema<SCHEMA, OPTIONS> : SCHEMA extends ReferencingSchema ? ParseReferenceSchema<SCHEMA, OPTIONS> : And<DoesExtend<OPTIONS["parseIfThenElseKeywords"], true>, DoesExtend<SCHEMA, IfThenElseSchema>> extends true ? SCHEMA extends IfThenElseSchema ? ParseIfThenElseSchema<SCHEMA, OPTIONS> : never : And<DoesExtend<OPTIONS["parseNotKeyword"], true>, DoesExtend<SCHEMA, NotSchema>> extends true ? SCHEMA extends NotSchema ? ParseNotSchema<SCHEMA, OPTIONS> : never : SCHEMA extends AllOfSchema ? ParseAllOfSchema<SCHEMA, OPTIONS> : SCHEMA extends OneOfSchema ? ParseOneOfSchema<SCHEMA, OPTIONS> : SCHEMA extends AnyOfSchema ? ParseAnyOfSchema<SCHEMA, OPTIONS> : SCHEMA extends EnumSchema ? ParseEnumSchema<SCHEMA, OPTIONS> : SCHEMA extends ConstSchema ? ParseConstSchema<SCHEMA, OPTIONS> : SCHEMA extends MultipleTypesSchema ? ParseMultipleTypesSchema<SCHEMA, OPTIONS> : SCHEMA extends SingleTypeSchema ? ParseSingleTypeSchema<SCHEMA, OPTIONS> : M.Any> = OPTIONS extends {
    deserialize: DeserializationPattern[];
} ? M.$Intersect<DeserializeSchema<SCHEMA, OPTIONS>, RESULT> : RESULT;
