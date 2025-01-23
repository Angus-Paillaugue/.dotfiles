import type { Nominal, of, To } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { Module, Submodule } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/module.ts";
import type { number } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/number/number.ts";
declare namespace string {
    type integer = of<string, Nominal<"integer">>;
}
export declare const integer: stringInteger.module;
export declare namespace stringInteger {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: string.integer;
        parse: (In: string.integer) => To<number.divisibleBy<1>>;
    };
}
export {};
