import type { TSESTree } from '@typescript-eslint/types';
import type { ScopeManager } from '../../src/ScopeManager';
import type { Scope } from '../../src/scope/Scope';
import { ScopeBase } from '../../src/scope/ScopeBase';
import { ScopeType } from '../../src/scope/ScopeType';
declare class TSModuleScope extends ScopeBase<ScopeType.tsModule, TSESTree.TSModuleDeclaration, Scope> {
    constructor(scopeManager: ScopeManager, upperScope: TSModuleScope['upper'], block: TSModuleScope['block']);
}
export { TSModuleScope };
//# sourceMappingURL=TSModuleScope.d.ts.map
