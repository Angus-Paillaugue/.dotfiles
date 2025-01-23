import type { ArkSchemaRegistry } from "@ark/schema";
import type { Ark } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/keywords.ts";
import type { exportScope } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/module.ts";
export * from "@ark/schema/config";
export interface ArkTypeRegistryContents extends ArkSchemaRegistry {
    ambient: exportScope<Ark>;
}
declare global {
    export interface ArkEnv {
        $(): Ark;
    }
}
/**
 * This mirrors the global ArkEnv namespace as a local export. We use it instead
 * of the global internally due to a bug in twoslash that prevents `ark/docs`
 * from building if we refer to the global directly.
 *
 * If, in the future, docs can build while arktype refers to `ArkEnv.$` directly,
 * this can be removed.
 */
export declare namespace ArkAmbient {
    type $ = ReturnType<ArkEnv["$"]>;
    type meta = ArkEnv.meta;
    type prototypes = ArkEnv.prototypes;
}
