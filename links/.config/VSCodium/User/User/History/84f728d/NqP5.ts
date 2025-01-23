import type { Divisor, ExclusiveNumericRangeSchema, exclusivizeRangeSchema, InclusiveNumericRangeSchema } from "@ark/schema";
import type { associateAttributesFromNumberSchema } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { BaseType } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/methods/base.ts";
/** @ts-ignore cast variance */
interface Type<out t extends number = number, $ = {}> extends BaseType<t, $> {
    divisibleBy<const schema extends Divisor.Schema>(schema: schema): Type<associateAttributesFromNumberSchema<t, "divisor", schema>, $>;
    atLeast<const schema extends InclusiveNumericRangeSchema>(schema: schema): Type<associateAttributesFromNumberSchema<t, "min", schema>, $>;
    atMost<const schema extends InclusiveNumericRangeSchema>(schema: schema): Type<associateAttributesFromNumberSchema<t, "max", schema>, $>;
    moreThan<const schema extends ExclusiveNumericRangeSchema>(schema: schema): Type<associateAttributesFromNumberSchema<t, "min", exclusivizeRangeSchema<schema>>, $>;
    lessThan<const schema extends ExclusiveNumericRangeSchema>(schema: schema): Type<associateAttributesFromNumberSchema<t, "max", exclusivizeRangeSchema<schema>>, $>;
}
export type { Type as NumberType };
