import type { Nominal, of, To } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { Module, Submodule } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/module.ts";
declare namespace string {
    type numeric = of<string, Nominal<"numeric">>;
}
export declare const numeric: stringNumeric.module;
export declare namespace stringNumeric {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: string.numeric;
        parse: (In: string.numeric) => To<number>;
    };
}
export {};
