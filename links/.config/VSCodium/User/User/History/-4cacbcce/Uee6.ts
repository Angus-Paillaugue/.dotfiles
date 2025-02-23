import { Scanner, type EscapeChar, type WhitespaceChar } from "@ark/util";
import type { Comparator } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/reduce/shared.ts";
export declare class ArkTypeScanner<lookahead extends string = string> extends Scanner<lookahead> {
    shiftUntilNextTerminator(): string;
    static terminatingChars: {
        readonly " ": 1;
        readonly "\n": 1;
        readonly "\t": 1;
        readonly "<": 1;
        readonly ">": 1;
        readonly "=": 1;
        readonly "|": 1;
        readonly "&": 1;
        readonly ")": 1;
        readonly "[": 1;
        readonly "%": 1;
        readonly ",": 1;
        readonly ":": 1;
        readonly "?": 1;
        readonly "#": 1;
    };
    static finalizingLookaheads: {
        readonly ">": 1;
        readonly ",": 1;
        readonly "": 1;
        readonly "=": 1;
        readonly "?": 1;
    };
    static lookaheadIsFinalizing: (lookahead: string, unscanned: string) => lookahead is ">" | "," | "=";
}
export declare namespace ArkTypeScanner {
    type lookaheadIsFinalizing<lookahead extends string, unscanned extends string> = lookahead extends ">" ? unscanned extends `=${infer nextUnscanned}` ? nextUnscanned extends `=${string}` ? true : false : ArkTypeScanner.skipWhitespace<unscanned> extends ("" | `${TerminatingChar}${string}`) ? true : false : lookahead extends "=" ? unscanned extends `=${string}` ? false : true : lookahead extends "," | "?" ? true : false;
    type TerminatingChar = keyof typeof ArkTypeScanner.terminatingChars;
    type FinalizingLookahead = keyof typeof ArkTypeScanner.finalizingLookaheads;
    type InfixToken = Comparator | "|" | "&" | "%" | ":" | "=>" | "#" | "@" | "=";
    type PostfixToken = "[]" | "?";
    type OperatorToken = InfixToken | PostfixToken;
    type shift<lookahead extends string, unscanned extends string> = `${lookahead}${unscanned}`;
    type shiftUntil<unscanned extends string, terminator extends string, scanned extends string = ""> = unscanned extends shift<infer lookahead, infer nextUnscanned> ? lookahead extends terminator ? scanned extends `${infer base}${EscapeChar}` ? shiftUntil<nextUnscanned, terminator, `${base}${lookahead}`> : [scanned, unscanned] : shiftUntil<nextUnscanned, terminator, `${scanned}${lookahead}`> : [scanned, ""];
    type shiftUntilNot<unscanned extends string, nonTerminator extends string, scanned extends string = ""> = unscanned extends shift<infer lookahead, infer nextUnscanned> ? lookahead extends nonTerminator ? shiftUntilNot<nextUnscanned, nonTerminator, `${scanned}${lookahead}`> : [scanned, unscanned] : [scanned, ""];
    type shiftUntilNextTerminator<unscanned extends string> = shiftUntil<unscanned, TerminatingChar>;
    type skipWhitespace<unscanned extends string> = shiftUntilNot<unscanned, WhitespaceChar>[1];
    type shiftResult<scanned extends string, unscanned extends string> = [
        scanned,
        unscanned
    ];
}
