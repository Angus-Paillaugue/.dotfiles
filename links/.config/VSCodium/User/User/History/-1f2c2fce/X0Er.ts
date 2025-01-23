import type { Nominal, of } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
declare namespace string {
    type semver = of<string, Nominal<"semver">>;
}
export declare const semver: import("@ark/schema").IntersectionNode;
export type semver = string.semver;
export {};
