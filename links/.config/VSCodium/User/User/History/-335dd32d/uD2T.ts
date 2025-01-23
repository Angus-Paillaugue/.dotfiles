import type { AtLeast, AtMost, DivisibleBy } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { number } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/number/number.ts";
/**
 * As per the ECMA-262 specification:
 * A time value supports a slightly smaller range of -8,640,000,000,000,000 to 8,640,000,000,000,000 milliseconds.
 *
 * @see https://262.ecma-international.org/15.0/index.html#sec-time-values-and-time-range
 */
export declare const epoch: import("@ark/schema").BaseRoot<import("@ark/schema").InternalRootDeclaration>;
export type epoch = number.is<DivisibleBy<1> & AtMost<8640000000000000> & AtLeast<-8640000000000000>>;
