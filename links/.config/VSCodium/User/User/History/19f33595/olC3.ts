import type { LimitLiteral } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
export type StringifiablePrefixOperator = "keyof";
export declare const minComparators: {
    readonly ">": true;
    readonly ">=": true;
};
export type MinComparator = keyof typeof minComparators;
export declare const maxComparators: {
    readonly "<": true;
    readonly "<=": true;
};
export type MaxComparator = keyof typeof maxComparators;
export declare const comparators: {
    ">": boolean;
    ">=": boolean;
    "<": boolean;
    "<=": boolean;
    "==": boolean;
};
export type Comparator = keyof typeof comparators;
export declare const invertedComparators: InvertedComparators;
export type InvertedComparators = {
    "<": ">";
    ">": "<";
    "<=": ">=";
    ">=": "<=";
    "==": "==";
};
export type OpenLeftBound = {
    limit: LimitLiteral;
    comparator: MinComparator;
};
export declare const writeUnmatchedGroupCloseMessage: <unscanned extends string>(unscanned: unscanned) => writeUnmatchedGroupCloseMessage<unscanned>;
export type writeUnmatchedGroupCloseMessage<unscanned extends string> = `Unmatched )${unscanned extends "" ? "" : ` before ${unscanned}`}`;
export declare const writeUnclosedGroupMessage: <missingChar extends string>(missingChar: missingChar) => writeUnclosedGroupMessage<missingChar>;
export type writeUnclosedGroupMessage<missingChar extends string> = `Missing ${missingChar}`;
export declare const writeOpenRangeMessage: <min extends LimitLiteral, comparator extends MinComparator>(min: min, comparator: comparator) => writeOpenRangeMessage<min, comparator>;
export type writeOpenRangeMessage<min extends LimitLiteral, comparator extends MinComparator> = `Left bounds are only valid when paired with right bounds (try ...${comparator}${min})`;
export type writeUnpairableComparatorMessage<comparator extends Comparator> = `Left-bounded expressions must specify their limits using < or <= (was ${comparator})`;
export declare const writeUnpairableComparatorMessage: <comparator extends Comparator>(comparator: comparator) => writeUnpairableComparatorMessage<comparator>;
export declare const writeMultipleLeftBoundsMessage: <openLimit extends LimitLiteral, openComparator extends MinComparator, limit extends LimitLiteral, comparator extends MinComparator>(openLimit: openLimit, openComparator: openComparator, limit: limit, comparator: comparator) => writeMultipleLeftBoundsMessage<openLimit, openComparator, limit, comparator>;
export type writeMultipleLeftBoundsMessage<openLimit extends LimitLiteral, openComparator extends MinComparator, limit extends LimitLiteral, comparator extends MinComparator> = `An expression may have at most one left bound (parsed ${openLimit}${InvertedComparators[openComparator]}, ${limit}${InvertedComparators[comparator]})`;
