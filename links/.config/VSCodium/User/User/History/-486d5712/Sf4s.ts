import type { TSESTree } from '@typescript-eslint/types';
import { DefinitionBase } from '../../src/definition/DefinitionBase';
import { DefinitionType } from '../../src/definition/DefinitionType';
declare class ImplicitGlobalVariableDefinition extends DefinitionBase<DefinitionType.ImplicitGlobalVariable, TSESTree.Node, null, TSESTree.BindingName> {
    readonly isTypeDefinition = false;
    readonly isVariableDefinition = true;
    constructor(name: TSESTree.BindingName, node: ImplicitGlobalVariableDefinition['node']);
}
export { ImplicitGlobalVariableDefinition };
//# sourceMappingURL=ImplicitGlobalVariableDefinition.d.ts.map
