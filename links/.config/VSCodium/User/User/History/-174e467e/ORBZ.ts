import type { emptyBrandNameMessage } from "@ark/schema";
import type { DynamicStateWithRoot } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/reduce/dynamic.ts";
import type { StaticState, state } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/reduce/static.ts";
import type { ArkTypeScanner } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/shift/scanner.ts";
export declare const parseBrand: (s: DynamicStateWithRoot) => void;
export type parseBrand<s extends StaticState, unscanned extends string> = ArkTypeScanner.shiftUntilNextTerminator<ArkTypeScanner.skipWhitespace<unscanned>> extends (ArkTypeScanner.shiftResult<`${infer brandName}`, infer nextUnscanned>) ? brandName extends "" ? state.error<emptyBrandNameMessage> : state.setRoot<s, [s["root"], "#", brandName], nextUnscanned> : never;
