import type { TSESTree } from '@typescript-eslint/types';
import type { ScopeManager } from '../../src/ScopeManager';
import type { Scope } from '../../src/scope/Scope';
import { ScopeBase } from '../../src/scope/ScopeBase';
import { ScopeType } from '../../src/scope/ScopeType';
declare class CatchScope extends ScopeBase<ScopeType.catch, TSESTree.CatchClause, Scope> {
    constructor(scopeManager: ScopeManager, upperScope: CatchScope['upper'], block: CatchScope['block']);
}
export { CatchScope };
//# sourceMappingURL=CatchScope.d.ts.map
