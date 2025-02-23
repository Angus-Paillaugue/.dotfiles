export * from '../src/clear-caches';
export * from '../src/create-program/getScriptKind';
export { getCanonicalFileName } from '../src/create-program/shared';
export { createProgramFromConfigFile as createProgram } from '../src/create-program/useProvidedPrograms';
export * from '../src/getModifiers';
export { TSError } from '../src/node-utils';
export { type AST, parse, parseAndGenerateServices, type ParseAndGenerateServicesResult, } from '../src/parser';
export type { ParserServices, ParserServicesWithoutTypeInformation, ParserServicesWithTypeInformation, TSESTreeOptions, } from '../src/parser-options';
export { simpleTraverse } from '../src/simple-traverse';
export * from '../src/ts-estree';
export { typescriptVersionIsAtLeast } from '../src/version-check';
export { version } from '../src/version';
export { withoutProjectParserOptions } from '../src/withoutProjectParserOptions';
//# sourceMappingURL=index.d.ts.map
