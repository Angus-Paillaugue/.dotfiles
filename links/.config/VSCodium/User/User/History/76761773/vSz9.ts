import { Hkt, liftArray, type Digit } from "@ark/util";
import type { To } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { Module, Submodule } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/module.ts";
declare class liftFromHkt extends Hkt<[element: unknown]> {
    body: liftArray<this[0]> extends infer lifted ? (In: this[0] | lifted) => To<lifted> : never;
}
declare const liftFrom: import("@ark/schema").GenericRoot<readonly [["element", unknown]], liftFromHkt>;
export declare const arkArray: arkArray.module;
export declare namespace arkArray {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: unknown[];
        readonly: readonly unknown[];
        index: NonNegativeIntegerString;
        liftFrom: typeof liftFrom.t;
    };
}
export type NonNegativeIntegerString = `${Digit}` | (`${Exclude<Digit, 0>}${string}` & `${bigint}`);
export {};
