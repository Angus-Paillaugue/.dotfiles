import { type EcmascriptObjects, type PlatformObjects } from "@ark/util";
import type { Module, Submodule } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/module.ts";
import { arkArray } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/constructors/Array.ts";
import { arkFormData } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/constructors/FormData.ts";
import { TypedArray } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/constructors/TypedArray.ts";
declare const omittedPrototypes: {
    Boolean: 1;
    Number: 1;
    String: 1;
};
export declare const arkPrototypes: arkPrototypes.module;
export declare namespace arkPrototypes {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    interface keywords extends ecmascript, platform {
    }
    interface $ extends Omit<keywords, keyof wrapped>, wrapped {
    }
    interface wrapped {
        Array: arkArray.submodule;
        TypedArray: TypedArray.submodule;
        FormData: arkFormData.submodule;
    }
    type ecmascript = Omit<EcmascriptObjects, keyof typeof omittedPrototypes>;
    type platform = PlatformObjects;
    interface instances extends ecmascript, platform {
    }
    type instanceOf<name extends keyof instances = keyof instances> = instances[name];
}
export {};
