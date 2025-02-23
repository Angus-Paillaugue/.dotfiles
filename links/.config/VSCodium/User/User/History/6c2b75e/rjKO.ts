import type { TSESTree } from '@typescript-eslint/types';
import type { ScopeManager } from '../../src/ScopeManager';
import type { Scope } from '../../src/scope/Scope';
import { ScopeBase } from '../../src/scope/ScopeBase';
import { ScopeType } from '../../src/scope/ScopeType';
declare class ClassFieldInitializerScope extends ScopeBase<ScopeType.classFieldInitializer, TSESTree.Expression, Scope> {
    constructor(scopeManager: ScopeManager, upperScope: ClassFieldInitializerScope['upper'], block: ClassFieldInitializerScope['block']);
}
export { ClassFieldInitializerScope };
//# sourceMappingURL=ClassFieldInitializerScope.d.ts.map
