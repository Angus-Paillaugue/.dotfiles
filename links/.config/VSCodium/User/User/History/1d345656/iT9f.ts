import '.pnpm/eslint-plugin-svelte@2.46.1_eslint@9.16.0_jiti@1.21.6__svelte@5.8.1/node_modules/eslint-plugin-svelte/lib/rule-types';
import type { RuleModule } from '.pnpm/eslint-plugin-svelte@2.46.1_eslint@9.16.0_jiti@1.21.6__svelte@5.8.1/node_modules/eslint-plugin-svelte/lib/types';
import * as processor from '.pnpm/eslint-plugin-svelte@2.46.1_eslint@9.16.0_jiti@1.21.6__svelte@5.8.1/node_modules/eslint-plugin-svelte/lib/processor';
declare const _default: {
    meta: typeof processor.meta;
    configs: {
        base: import("eslint").Linter.LegacyConfig<import("eslint").Linter.RulesRecord, import("eslint").Linter.RulesRecord>;
        recommended: import("eslint").Linter.LegacyConfig<import("eslint").Linter.RulesRecord, import("eslint").Linter.RulesRecord>;
        prettier: import("eslint").Linter.LegacyConfig<import("eslint").Linter.RulesRecord, import("eslint").Linter.RulesRecord>;
        all: import("eslint").Linter.LegacyConfig<import("eslint").Linter.RulesRecord, import("eslint").Linter.RulesRecord>;
        'flat/base': import("eslint").Linter.Config<import("eslint").Linter.RulesRecord>[];
        'flat/recommended': import("eslint").Linter.Config<import("eslint").Linter.RulesRecord>[];
        'flat/prettier': import("eslint").Linter.Config<import("eslint").Linter.RulesRecord>[];
        'flat/all': import("eslint").Linter.Config<import("eslint").Linter.RulesRecord>[];
    };
    rules: {
        [key: string]: RuleModule;
    };
    processors: {
        '.svelte': typeof processor;
        svelte: typeof processor;
    };
};
export = _default;
