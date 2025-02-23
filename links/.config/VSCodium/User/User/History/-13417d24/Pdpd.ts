import type { TSESTree } from '@typescript-eslint/types';
import type { ScopeManager } from '../../src/ScopeManager';
import type { Scope } from '../../src/scope/Scope';
import { ScopeBase } from '../../src/scope/ScopeBase';
import { ScopeType } from '../../src/scope/ScopeType';
declare class SwitchScope extends ScopeBase<ScopeType.switch, TSESTree.SwitchStatement, Scope> {
    constructor(scopeManager: ScopeManager, upperScope: SwitchScope['upper'], block: SwitchScope['block']);
}
export { SwitchScope };
//# sourceMappingURL=SwitchScope.d.ts.map
