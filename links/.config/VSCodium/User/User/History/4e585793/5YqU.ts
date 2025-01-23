import type { Nominal, of, To } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { Module, Submodule } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/module.ts";
declare namespace string {
    type lowercase = of<string, Nominal<"lowercase">>;
}
export declare const lower: lower.module;
export declare namespace lower {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: (In: string) => To<string.lowercase>;
        preformatted: string.lowercase;
    };
}
export {};
