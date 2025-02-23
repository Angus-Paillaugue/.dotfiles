import type { TSESTree } from '@typescript-eslint/types';
import type { ScopeManager } from '../../src/ScopeManager';
import type { Scope } from '../../src/scope/Scope';
import { ScopeBase } from '../../src/scope/ScopeBase';
import { ScopeType } from '../../src/scope/ScopeType';
declare class TSEnumScope extends ScopeBase<ScopeType.tsEnum, TSESTree.TSEnumDeclaration, Scope> {
    constructor(scopeManager: ScopeManager, upperScope: TSEnumScope['upper'], block: TSEnumScope['block']);
}
export { TSEnumScope };
//# sourceMappingURL=TSEnumScope.d.ts.map
