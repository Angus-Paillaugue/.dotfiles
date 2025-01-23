import type { Nominal, of, To } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { Module, Submodule } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/module.ts";
declare namespace string {
    type uppercase = of<string, Nominal<"uppercase">>;
}
export declare const upper: upper.module;
export declare namespace upper {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: (In: string) => To<string.uppercase>;
        preformatted: string.uppercase;
    };
}
export {};
