import type { To } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { Module, Submodule } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/module.ts";
export type FormDataValue = string | File;
export type ParsedFormData = Record<string, FormDataValue | FormDataValue[]>;
export declare const arkFormData: arkFormData.module;
export declare namespace arkFormData {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: FormData;
        value: FormDataValue;
        parse: (In: FormData) => To<ParsedFormData>;
        parsed: ParsedFormData;
    };
}
