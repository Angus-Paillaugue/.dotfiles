import type { Nominal, of, To } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { Module, Submodule } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/module.ts";
declare namespace string {
    type capitalized = of<string, Nominal<"capitalized">>;
}
export declare const capitalize: capitalize.module;
export declare namespace capitalize {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: (In: string) => To<string.capitalized>;
        preformatted: string.capitalized;
    };
}
export {};
