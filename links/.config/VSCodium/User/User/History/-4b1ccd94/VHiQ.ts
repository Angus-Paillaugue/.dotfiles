import type { Nominal, To, of } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { Module, Submodule } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/module.ts";
type DayDelimiter = "." | "/" | "-";
type DayPart = DayPatterns[PartKey];
type PartKey = keyof DayPatterns;
type DayPatterns = {
    y: "yy" | "yyyy";
    m: "mm" | "m";
    d: "dd" | "d";
};
type fragment<part extends DayPart, delimiter extends DayDelimiter> = `${delimiter}${part}` | "";
export type DayPattern<delimiter extends DayDelimiter = DayDelimiter> = delimiter extends unknown ? {
    [k1 in keyof DayPatterns]: {
        [k2 in Exclude<keyof DayPatterns, k1>]: `${DayPatterns[k1]}${fragment<DayPatterns[k2], delimiter>}${fragment<DayPatterns[Exclude<keyof DayPatterns, k1 | k2>], delimiter>}`;
    }[Exclude<keyof DayPatterns, k1>];
}[keyof DayPatterns] : never;
export type DateFormat = "iso" | DayPattern;
export type DateOptions = {
    format?: DateFormat;
};
export declare const iso8601Matcher: RegExp;
export declare const tryParseDatePattern: (data: string, opts?: DateOptions) => Date | string;
declare namespace string {
    type date = of<string, Nominal<"date">>;
    namespace date {
        type epoch = of<string, Nominal<"date.epoch">>;
        type iso = of<string, Nominal<"date.iso">>;
    }
}
export declare const stringDate: stringDate.module;
export declare namespace stringDate {
    type module = Module<stringDate.submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: string.date;
        parse: (In: string.date) => To<Date>;
        iso: iso.submodule;
        epoch: epoch.submodule;
    };
    namespace iso {
        type submodule = Submodule<$>;
        type $ = {
            root: string.date.iso;
            parse: (In: string.date.iso) => To<Date>;
        };
    }
    namespace epoch {
        type submodule = Submodule<$>;
        type $ = {
            root: string.date.epoch;
            parse: (In: string.date.epoch) => To<Date>;
        };
    }
}
export {};
