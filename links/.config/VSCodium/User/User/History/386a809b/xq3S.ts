import type { RuleCreateFunction, RuleModule } from '../../src/ts-eslint';
/**
 * Uses type inference to fetch the Options type from the given RuleModule
 */
type InferOptionsTypeFromRule<T> = T extends RuleModule<infer _MessageIds, infer Options> ? Options : T extends RuleCreateFunction<infer _MessageIds, infer Options> ? Options : unknown;
/**
 * Uses type inference to fetch the MessageIds type from the given RuleModule
 */
type InferMessageIdsTypeFromRule<T> = T extends RuleModule<infer MessageIds, infer _TOptions> ? MessageIds : T extends RuleCreateFunction<infer MessageIds, infer _TOptions> ? MessageIds : unknown;
export type { InferMessageIdsTypeFromRule, InferOptionsTypeFromRule };
//# sourceMappingURL=InferTypesFromRule.d.ts.map
