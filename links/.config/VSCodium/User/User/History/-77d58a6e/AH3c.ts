import type { writeIndivisibleMessage } from "@ark/schema";
import type { ErrorMessage } from "@ark/util";
import type { inferAstIn } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/ast/infer.ts";
import type { validateAst } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/ast/validate.ts";
export type validateDivisor<l, $, args> = inferAstIn<l, $, args> extends infer data ? [
    data
] extends [number] ? validateAst<l, $, args> : ErrorMessage<writeIndivisibleMessage<data>> : never;
