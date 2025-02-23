import type { TSESTree } from '@typescript-eslint/types';
import type { PatternVisitorCallback, PatternVisitorOptions } from '../../src/referencer/PatternVisitor';
import type { VisitorOptions } from '../../src/referencer/VisitorBase';
import { VisitorBase } from '../../src/referencer/VisitorBase';
interface VisitPatternOptions extends PatternVisitorOptions {
    processRightHandNodes?: boolean;
}
declare class Visitor extends VisitorBase {
    #private;
    constructor(optionsOrVisitor: Visitor | VisitorOptions);
    protected visitPattern(node: TSESTree.Node, callback: PatternVisitorCallback, options?: VisitPatternOptions): void;
}
export { Visitor };
export { VisitorBase, type VisitorOptions } from '../../src/referencer/VisitorBase';
//# sourceMappingURL=Visitor.d.ts.map
