import type { anyOrNever, array } from "@ark/util";
import type { InferredMorph } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { ArrayType } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/methods/array.ts";
import type { BaseType } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/methods/base.ts";
import type { DateType } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/methods/date.ts";
import type { MorphType } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/methods/morph.ts";
import type { NumberType } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/methods/number.ts";
import type { ObjectType } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/methods/object.ts";
import type { StringType } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/methods/string.ts";
export type instantiateType<t, $> = NoInfer<_instantiateType<t, $>> extends infer r ? r : never;
export type _instantiateType<t, $> = [
    Extract<t, InferredMorph>
] extends [anyOrNever] ? [
    t
] extends [anyOrNever] ? BaseType<t, $> : [t] extends [string] ? StringType<t, $> : [t] extends [number] ? NumberType<t, $> : [t] extends [object] ? [
    t
] extends [array] ? ArrayType<t, $> : [t] extends [Date] ? DateType<t, $> : ObjectType<t, $> : BaseType<t, $> : MorphType<t, $>;
