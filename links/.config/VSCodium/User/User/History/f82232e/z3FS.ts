import type { TSESTree } from '@typescript-eslint/types';
import type { ScopeManager } from '../../src/ScopeManager';
import type { Scope } from '../../src/scope/Scope';
import { ScopeBase } from '../../src/scope/ScopeBase';
import { ScopeType } from '../../src/scope/ScopeType';
declare class WithScope extends ScopeBase<ScopeType.with, TSESTree.WithStatement, Scope> {
    constructor(scopeManager: ScopeManager, upperScope: WithScope['upper'], block: WithScope['block']);
    close(scopeManager: ScopeManager): Scope | null;
}
export { WithScope };
//# sourceMappingURL=WithScope.d.ts.map
