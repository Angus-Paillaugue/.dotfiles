import type { Nominal, of, To } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { Module, Submodule } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/module.ts";
declare namespace string {
    type normalized = normalized.NFC;
    namespace normalized {
        type NFC = of<string, Nominal<"normalized.NFC">>;
        type NFD = of<string, Nominal<"normalized.NFD">>;
        type NFKC = of<string, Nominal<"normalized.NFKC">>;
        type NFKD = of<string, Nominal<"normalized.NFKD">>;
    }
}
export declare const normalizedForms: readonly ["NFC", "NFD", "NFKC", "NFKD"];
export type NormalizedForm = (typeof normalizedForms)[number];
export declare const NFC: Module<{
    root: unknown;
    preformatted: unknown;
}>;
export declare const NFD: Module<{
    root: unknown;
    preformatted: unknown;
}>;
export declare const NFKC: Module<{
    root: unknown;
    preformatted: unknown;
}>;
export declare const NFKD: Module<{
    root: unknown;
    preformatted: unknown;
}>;
export declare const normalize: Module<{
    root: unknown;
    NFC: Submodule<{
        root: unknown;
        preformatted: unknown;
    }>;
    NFD: Submodule<{
        root: unknown;
        preformatted: unknown;
    }>;
    NFKC: Submodule<{
        root: unknown;
        preformatted: unknown;
    }>;
    NFKD: Submodule<{
        root: unknown;
        preformatted: unknown;
    }>;
}>;
export declare namespace normalize {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: (In: string) => To<string.normalized.NFC>;
        NFC: NFC.submodule;
        NFD: NFD.submodule;
        NFKC: NFKC.submodule;
        NFKD: NFKD.submodule;
    };
    namespace NFC {
        type submodule = Submodule<$>;
        type $ = {
            root: (In: string) => To<string.normalized.NFC>;
            preformatted: string.normalized.NFC;
        };
    }
    namespace NFD {
        type submodule = Submodule<$>;
        type $ = {
            root: (In: string) => To<string.normalized.NFD>;
            preformatted: string.normalized.NFD;
        };
    }
    namespace NFKC {
        type submodule = Submodule<$>;
        type $ = {
            root: (In: string) => To<string.normalized.NFKC>;
            preformatted: string.normalized.NFKC;
        };
    }
    namespace NFKD {
        type submodule = Submodule<$>;
        type $ = {
            root: (In: string) => To<string.normalized.NFKD>;
            preformatted: string.normalized.NFKD;
        };
    }
}
export {};
