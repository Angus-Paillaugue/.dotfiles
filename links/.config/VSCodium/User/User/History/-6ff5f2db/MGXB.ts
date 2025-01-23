import type { Nominal, of, To } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { Module, Submodule } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/module.ts";
declare namespace string {
    type url = of<string, Nominal<"url">>;
}
export declare const url: url.module;
export declare namespace url {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: string.url;
        parse: (In: string.url) => To<URL>;
    };
}
export {};
