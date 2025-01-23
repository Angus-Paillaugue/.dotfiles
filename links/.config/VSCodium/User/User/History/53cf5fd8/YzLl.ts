import type { Nominal, of } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
declare namespace string {
    type email = of<string, Nominal<"email">>;
}
export declare const email: import("@ark/schema").IntersectionNode;
export type email = string.email;
export {};
