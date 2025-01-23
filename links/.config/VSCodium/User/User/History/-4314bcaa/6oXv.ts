import type { Nominal, of } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
declare namespace string {
    type alpha = of<string, Nominal<"alpha">>;
}
export declare const alpha: import("@ark/schema").IntersectionNode;
export type alpha = string.alpha;
export {};
