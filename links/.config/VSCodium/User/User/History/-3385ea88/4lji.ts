import type { TSESTree } from '@typescript-eslint/types';
import { DefinitionBase } from '../../src/definition/DefinitionBase';
import { DefinitionType } from '../../src/definition/DefinitionType';
declare class TSEnumMemberDefinition extends DefinitionBase<DefinitionType.TSEnumMember, TSESTree.TSEnumMember, null, TSESTree.Identifier | TSESTree.StringLiteral> {
    readonly isTypeDefinition = true;
    readonly isVariableDefinition = true;
    constructor(name: TSESTree.Identifier | TSESTree.StringLiteral, node: TSEnumMemberDefinition['node']);
}
export { TSEnumMemberDefinition };
//# sourceMappingURL=TSEnumMemberDefinition.d.ts.map
