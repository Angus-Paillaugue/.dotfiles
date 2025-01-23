import type { Nominal, To, of } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { Module, Submodule } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/module.ts";
declare namespace string {
    type json = of<string, Nominal<"json">>;
}
export declare const writeJsonSyntaxErrorProblem: (error: unknown) => string;
export declare const json: stringJson.module;
export declare namespace stringJson {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: string.json;
        parse: (In: string.json) => To<object>;
    };
}
export {};
