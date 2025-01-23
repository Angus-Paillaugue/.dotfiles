import type { Nominal, of } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
declare namespace string {
    type alphanumeric = of<string, Nominal<"alphanumeric">>;
}
export declare const alphanumeric: import("@ark/schema").IntersectionNode;
export type alphanumeric = string.alphanumeric;
export {};
