import type { TSESTree } from '@typescript-eslint/types';
import type { ScopeManager } from '../../src/ScopeManager';
import type { Scope } from '../../src/scope/Scope';
import { ScopeBase } from '../../src/scope/ScopeBase';
import { ScopeType } from '../../src/scope/ScopeType';
declare class ClassStaticBlockScope extends ScopeBase<ScopeType.classStaticBlock, TSESTree.StaticBlock, Scope> {
    constructor(scopeManager: ScopeManager, upperScope: ClassStaticBlockScope['upper'], block: ClassStaticBlockScope['block']);
}
export { ClassStaticBlockScope };
//# sourceMappingURL=ClassStaticBlockScope.d.ts.map
