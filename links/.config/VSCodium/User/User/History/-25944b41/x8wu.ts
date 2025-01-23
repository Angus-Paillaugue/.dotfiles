import type { IntersectUnion } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/utils/intersectUnion";
export declare type UnionLast<UNION> = IntersectUnion<UNION extends unknown ? (x: UNION) => void : never> extends (x: infer LAST) => void ? LAST : never;
