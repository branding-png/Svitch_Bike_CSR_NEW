import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'scripts']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // Context files export both Provider + hook by design — Fast Refresh
      // boundary warnings are dev-only noise for our pattern.
      'react-refresh/only-export-components': 'off',
      // Hooks-purity rules in this version of the plugin are over-eager for
      // unrelated patterns like `Date.now()` inside `useState(...)` and id
      // generation inside JSX. Re-enable when we adopt the v6 ruleset.
      'react-hooks/purity': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'no-empty': ['error', { allowEmptyCatch: true }],

      // Catch dead code / typos without being noisy:
      // — Unused args prefixed with `_` are intentional (placeholder).
      // — Errors-caught vars get the same treatment so try/catch isn't punished.
      'no-unused-vars': ['warn', {
        argsIgnorePattern:    '^_',
        varsIgnorePattern:    '^_',
        caughtErrorsIgnorePattern: '^_',
        ignoreRestSiblings:   true,
      }],
      // Quality-of-life:
      'no-console':           ['warn', { allow: ['warn', 'error'] }],
      'no-debugger':          'error',
      'no-duplicate-imports': 'error',
      'prefer-const':         'warn',
      'eqeqeq':               ['error', 'always', { null: 'ignore' }],
    },
  },
])
