import type { ExclusiveDateRangeSchema, exclusivizeRangeSchema, InclusiveDateRangeSchema } from "@ark/schema";
import type { associateAttributesFromDateSchema } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { ObjectType } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/methods/object.ts";
/** @ts-ignore cast variance */
interface Type<out t extends globalThis.Date = globalThis.Date, $ = {}> extends ObjectType<t, $> {
    atOrAfter<const schema extends InclusiveDateRangeSchema>(schema: schema): Type<associateAttributesFromDateSchema<t, "after", schema>, $>;
    atOrBefore<const schema extends InclusiveDateRangeSchema>(schema: schema): Type<associateAttributesFromDateSchema<t, "before", schema>, $>;
    laterThan<const schema extends ExclusiveDateRangeSchema>(schema: schema): Type<associateAttributesFromDateSchema<t, "after", exclusivizeRangeSchema<schema>>, $>;
    earlierThan<const schema extends ExclusiveDateRangeSchema>(schema: schema): Type<associateAttributesFromDateSchema<t, "before", exclusivizeRangeSchema<schema>>, $>;
}
export type { Type as DateType };
