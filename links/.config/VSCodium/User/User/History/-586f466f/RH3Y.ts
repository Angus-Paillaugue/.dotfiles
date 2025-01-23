import type { IsObject } from ".pnpm/ts-algebra@2.0.0/node_modules/ts-algebra/lib/utils/extends";
export declare type Prettify<TYPE> = IsObject<TYPE> extends true ? {
    [KEY in keyof TYPE]: KEY extends keyof TYPE ? TYPE[KEY] : never;
} : TYPE;
