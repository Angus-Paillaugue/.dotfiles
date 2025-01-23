import type { Nominal, of } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { Module, Submodule } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/module.ts";
declare namespace string {
    type ip = of<string, Nominal<"ip">>;
    namespace ip {
        type v4 = of<string, Nominal<"ip.v4">>;
        type v6 = of<string, Nominal<"ip.v6">>;
    }
}
export declare const ip: ip.module;
export declare namespace ip {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: string.ip;
        v4: string.ip.v4;
        v6: string.ip.v6;
    };
}
export {};
