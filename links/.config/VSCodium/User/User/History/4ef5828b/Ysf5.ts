import type { TSESTree } from '@typescript-eslint/types';
import type { ScopeManager } from '../../src/ScopeManager';
import type { Scope } from '../../src/scope/Scope';
import { ScopeBase } from '../../src/scope/ScopeBase';
import { ScopeType } from '../../src/scope/ScopeType';
declare class BlockScope extends ScopeBase<ScopeType.block, TSESTree.BlockStatement, Scope> {
    constructor(scopeManager: ScopeManager, upperScope: BlockScope['upper'], block: BlockScope['block']);
}
export { BlockScope };
//# sourceMappingURL=BlockScope.d.ts.map
