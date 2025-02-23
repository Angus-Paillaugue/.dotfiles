import type { TSESTree } from '@typescript-eslint/types';
import type { ScopeManager } from '../../src/ScopeManager';
import type { Scope } from '../../src/scope/Scope';
import { ScopeBase } from '../../src/scope/ScopeBase';
import { ScopeType } from '../../src/scope/ScopeType';
declare class TypeScope extends ScopeBase<ScopeType.type, TSESTree.TSInterfaceDeclaration | TSESTree.TSTypeAliasDeclaration, Scope> {
    constructor(scopeManager: ScopeManager, upperScope: TypeScope['upper'], block: TypeScope['block']);
}
export { TypeScope };
//# sourceMappingURL=TypeScope.d.ts.map
