import type { JSONSchemaReference } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/definitions";
import type { DeserializationPattern } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/definitions/deserializationPattern";
import type { ExtendedJSONSchemaReference, JSONSchemaExtension } from ".pnpm/json-schema-to-ts@3.1.1/node_modules/json-schema-to-ts/lib/types/definitions/extendedJsonSchema";
export type FromSchemaOptions = {
    parseNotKeyword?: boolean;
    parseIfThenElseKeywords?: boolean;
    keepDefaultedPropertiesOptional?: boolean;
    references?: JSONSchemaReference[] | false;
    deserialize?: DeserializationPattern[] | false;
};
export type FromExtendedSchemaOptions<EXTENSION extends JSONSchemaExtension> = {
    parseNotKeyword?: boolean;
    parseIfThenElseKeywords?: boolean;
    keepDefaultedPropertiesOptional?: boolean;
    references?: ExtendedJSONSchemaReference<EXTENSION>[] | false;
    deserialize?: DeserializationPattern[] | false;
};
export type FromSchemaDefaultOptions = {
    parseNotKeyword: false;
    parseIfThenElseKeywords: false;
    keepDefaultedPropertiesOptional: false;
    references: false;
    deserialize: false;
};
