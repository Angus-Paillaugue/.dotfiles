import defaultErrorMap from ".pnpm/zod@3.23.8/node_modules/zod/locales/en.js";
import type { ZodErrorMap } from "./ZodError";
export { defaultErrorMap };
export declare function setErrorMap(map: ZodErrorMap): void;
export declare function getErrorMap(): ZodErrorMap;
