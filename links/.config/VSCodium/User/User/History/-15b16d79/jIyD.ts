import type { TSESTree } from '@typescript-eslint/types';
import type { ScopeManager } from '../../src/ScopeManager';
import type { Scope } from '../../src/scope/Scope';
import { ScopeBase } from '../../src/scope/ScopeBase';
import { ScopeType } from '../../src/scope/ScopeType';
declare class ForScope extends ScopeBase<ScopeType.for, TSESTree.ForInStatement | TSESTree.ForOfStatement | TSESTree.ForStatement, Scope> {
    constructor(scopeManager: ScopeManager, upperScope: ForScope['upper'], block: ForScope['block']);
}
export { ForScope };
//# sourceMappingURL=ForScope.d.ts.map
