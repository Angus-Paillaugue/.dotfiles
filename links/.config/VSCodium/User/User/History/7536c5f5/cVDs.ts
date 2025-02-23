import type { TSESTree } from '@typescript-eslint/types';
import type { ScopeManager } from '../../src/ScopeManager';
import type { Scope } from '../../src/scope/Scope';
import { ScopeBase } from '../../src/scope/ScopeBase';
import { ScopeType } from '../../src/scope/ScopeType';
declare class MappedTypeScope extends ScopeBase<ScopeType.mappedType, TSESTree.TSMappedType, Scope> {
    constructor(scopeManager: ScopeManager, upperScope: MappedTypeScope['upper'], block: MappedTypeScope['block']);
}
export { MappedTypeScope };
//# sourceMappingURL=MappedTypeScope.d.ts.map
