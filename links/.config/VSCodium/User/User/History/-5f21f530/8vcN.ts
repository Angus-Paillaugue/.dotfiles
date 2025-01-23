import type { inferPipe } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/attributes.ts";
import type { type } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/keywords/keywords.ts";
import type { BaseType } from ".pnpm/arktype@2.0.0-rc.26/node_modules/arktype/internal/methods/base.ts";
/** @ts-ignore cast variance */
interface Type<out t = unknown, $ = {}> extends BaseType<t, $> {
    /**
     * Append extra validation shape on the pipe output
     * @example type({codes: 'string.numeric[]'}).pipe(obj => obj.codes).to('string.numeric.parse[]')
     */
    to<const def, r = type.infer<def, $>>(def: type.validate<def, $>): Type<inferPipe<t, r>, $>;
}
export type { Type as MorphType };
