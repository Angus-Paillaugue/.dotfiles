import type { writeNonStructuralOperandMessage } from "@ark/schema";
import type { ErrorMessage, typeToString } from "@ark/util";
import type { inferAstRoot } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/ast/infer.ts";
import type { validateAst } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/parser/ast/validate.ts";
export type validateKeyof<operandAst, $, args> = inferAstRoot<operandAst, $, args> extends infer data ? [
    data
] extends [object] ? validateAst<operandAst, $, args> : ErrorMessage<writeNonStructuralOperandMessage<"keyof", typeToString<data>>> : never;
