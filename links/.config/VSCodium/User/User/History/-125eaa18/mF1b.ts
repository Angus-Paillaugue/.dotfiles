import type { UnionLast } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/utils/unionLast";
export declare type UnionPop<UNION> = Exclude<UNION, UnionLast<UNION>>;
