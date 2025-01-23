import { type WhitespaceChar } from "@ark/util";
import type { DynamicState } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/reduce/dynamic.ts";
import type { StaticState, state } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/reduce/static.ts";
import type { BaseCompletions } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/string.ts";
import type { ArkTypeScanner } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/shift/scanner.ts";
import { parseEnclosed, type EnclosingQuote, type EnclosingStartToken } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/shift/operand/enclosed.ts";
import { parseUnenclosed } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/shift/operand/unenclosed.ts";
export declare const parseOperand: (s: DynamicState) => void;
export type parseOperand<s extends StaticState, $, args> = s["unscanned"] extends (ArkTypeScanner.shift<infer lookahead, infer unscanned>) ? lookahead extends "(" ? state.reduceGroupOpen<s, unscanned> : lookahead extends EnclosingStartToken ? parseEnclosed<s, lookahead, unscanned> : lookahead extends WhitespaceChar ? parseOperand<state.scanTo<s, unscanned>, $, args> : lookahead extends "d" ? unscanned extends (ArkTypeScanner.shift<infer enclosing extends EnclosingQuote, infer nextUnscanned>) ? parseEnclosed<s, `d${enclosing}`, nextUnscanned> : parseUnenclosed<s, $, args> : parseUnenclosed<s, $, args> : state.completion<`${s["scanned"]}${BaseCompletions<$, args>}`>;
