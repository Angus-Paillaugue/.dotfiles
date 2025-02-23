import type { TSESTree } from '@typescript-eslint/types';
import { DefinitionBase } from '../../src/definition/DefinitionBase';
import { DefinitionType } from '../../src/definition/DefinitionType';
declare class VariableDefinition extends DefinitionBase<DefinitionType.Variable, TSESTree.VariableDeclarator, TSESTree.VariableDeclaration, TSESTree.Identifier> {
    readonly isTypeDefinition = false;
    readonly isVariableDefinition = true;
    constructor(name: TSESTree.Identifier, node: VariableDefinition['node'], decl: TSESTree.VariableDeclaration);
}
export { VariableDefinition };
//# sourceMappingURL=VariableDefinition.d.ts.map
