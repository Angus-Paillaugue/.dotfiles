import type { Nominal, of } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
declare namespace string {
    type digits = of<string, Nominal<"digits">>;
}
export declare const digits: import("@ark/schema").IntersectionNode;
export type digits = string.digits;
export {};
