import type { TSESTree } from '@typescript-eslint/types';
import type { ScopeManager } from '../../src/ScopeManager';
import type { Scope } from '../../src/scope/Scope';
import { ScopeBase } from '../../src/scope/ScopeBase';
import { ScopeType } from '../../src/scope/ScopeType';
declare class ModuleScope extends ScopeBase<ScopeType.module, TSESTree.Program, Scope> {
    constructor(scopeManager: ScopeManager, upperScope: ModuleScope['upper'], block: ModuleScope['block']);
}
export { ModuleScope };
//# sourceMappingURL=ModuleScope.d.ts.map
