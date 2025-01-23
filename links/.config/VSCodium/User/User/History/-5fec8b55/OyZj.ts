import type { Nominal, of } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { Module, Submodule } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/module.ts";
export declare const base64: Module<{
    root: unknown;
    url: unknown;
}>;
declare namespace string {
    type base64 = of<string, Nominal<"base64">>;
    namespace base64 {
        type url = of<string, Nominal<"base64.url">>;
    }
}
export declare namespace base64 {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: string.base64;
        url: string.base64.url;
    };
}
export {};
