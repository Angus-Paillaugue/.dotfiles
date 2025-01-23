import type { Nominal, of, To } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { Module, Submodule } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/module.ts";
declare namespace string {
    type trimmed = of<string, Nominal<"trimmed">>;
}
export declare const trim: trim.module;
export declare namespace trim {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: (In: string) => To<string.trimmed>;
        preformatted: string.trimmed;
    };
}
export {};
