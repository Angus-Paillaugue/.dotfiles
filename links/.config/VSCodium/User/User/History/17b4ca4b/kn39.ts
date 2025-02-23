import type { DynamicStateWithRoot } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/reduce/dynamic.ts";
import type { StaticState, state } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/reduce/static.ts";
import type { ArkTypeScanner } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/shift/scanner.ts";
export declare const parseDivisor: (s: DynamicStateWithRoot) => void;
export type parseDivisor<s extends StaticState, unscanned extends string> = ArkTypeScanner.shiftUntilNextTerminator<ArkTypeScanner.skipWhitespace<unscanned>> extends ArkTypeScanner.shiftResult<infer scanned, infer nextUnscanned> ? scanned extends `${infer divisor extends number}` ? divisor extends 0 ? state.error<writeInvalidDivisorMessage<0>> : state.setRoot<s, [s["root"], "%", divisor], nextUnscanned> : state.error<writeInvalidDivisorMessage<scanned>> : never;
export declare const writeInvalidDivisorMessage: <divisor extends string | number>(divisor: divisor) => writeInvalidDivisorMessage<divisor>;
export type writeInvalidDivisorMessage<divisor extends string | number> = `% operator must be followed by a non-zero integer literal (was ${divisor})`;
