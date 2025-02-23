import type { TSESTree } from '@typescript-eslint/types';
import type { ScopeManager } from '../../src/ScopeManager';
import type { Scope } from '../../src/scope/Scope';
import { ScopeBase } from '../../src/scope/ScopeBase';
import { ScopeType } from '../../src/scope/ScopeType';
declare class ConditionalTypeScope extends ScopeBase<ScopeType.conditionalType, TSESTree.TSConditionalType, Scope> {
    constructor(scopeManager: ScopeManager, upperScope: ConditionalTypeScope['upper'], block: ConditionalTypeScope['block']);
}
export { ConditionalTypeScope };
//# sourceMappingURL=ConditionalTypeScope.d.ts.map
