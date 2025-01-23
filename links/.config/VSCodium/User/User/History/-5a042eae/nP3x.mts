import { BundledLanguage } from '.pnpm/shiki@1.24.0/node_modules/shiki/langs';
import { BundledTheme } from '.pnpm/shiki@1.24.0/node_modules/shiki/themes';
export * from '@shikijs/core/types';
import '@shikijs/core';

type BuiltinLanguage = BundledLanguage;
type BuiltinTheme = BundledTheme;

export { type BuiltinLanguage, type BuiltinTheme, BundledLanguage, BundledTheme };
