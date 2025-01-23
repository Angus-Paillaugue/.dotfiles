import type { Nominal, of } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
export declare const isLuhnValid: (creditCardInput: string) => boolean;
declare namespace string {
    type creditCard = of<string, Nominal<"creditCard">>;
}
export declare const creditCard: import("@ark/schema").BaseRoot<import("@ark/schema").InternalRootDeclaration>;
export type creditCard = string.creditCard;
export {};
