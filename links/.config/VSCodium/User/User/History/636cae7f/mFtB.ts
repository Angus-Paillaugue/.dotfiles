import type { Nominal, of } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { Module, Submodule } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/module.ts";
export declare const uuid: Module<{
    root: import(".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/string/string.ts").string.matching<string> | "00000000-0000-0000-0000-000000000000" | "ffffffff-ffff-ffff-ffff-ffffffffffff";
    v4: unknown;
    v6: unknown;
    v1: unknown;
    v2: unknown;
    v3: unknown;
    v5: unknown;
    v7: unknown;
    v8: unknown;
}>;
declare namespace string {
    type uuid = of<string, Nominal<"uuid">>;
    namespace uuid {
        type v1 = of<string, Nominal<"uuid.v1">>;
        type v2 = of<string, Nominal<"uuid.v2">>;
        type v3 = of<string, Nominal<"uuid.v3">>;
        type v4 = of<string, Nominal<"uuid.v4">>;
        type v5 = of<string, Nominal<"uuid.v5">>;
        type v6 = of<string, Nominal<"uuid.v6">>;
        type v7 = of<string, Nominal<"uuid.v7">>;
        type v8 = of<string, Nominal<"uuid.v8">>;
    }
}
export declare namespace uuid {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: string.uuid;
        v1: string.uuid.v1;
        v2: string.uuid.v2;
        v3: string.uuid.v3;
        v4: string.uuid.v4;
        v5: string.uuid.v5;
        v6: string.uuid.v6;
        v7: string.uuid.v7;
        v8: string.uuid.v8;
    };
}
export {};
