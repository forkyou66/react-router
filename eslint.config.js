import js from '@eslint/js';
import {defineConfig, globalIgnores} from 'eslint/config';
import prettier from 'eslint-config-prettier';
import react_hooks from 'eslint-plugin-react-hooks';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import ts_eslint from 'typescript-eslint';

const arrowMessage = 'Use an arrow function closure: const myFunc = () => {...};';

export default defineConfig([
  globalIgnores(['build/', '.react-router/', 'node_modules/']),
  js.configs.recommended,
  ts_eslint.configs.recommended,
  react_hooks.configs.flat.recommended,
  {
    languageOptions: {globals: {...globals.browser, ...globals.node}},
    plugins: {unicorn},
    rules: {
      // kebab-case files, except hooks (useMyHook.ts) and tool-mandated config files
      'unicorn/filename-case': [
        'error',
        {case: 'kebabCase', ignore: [/^use[A-Z]\w*\.tsx?$/, /^react-router\.config\.ts$/]}
      ],

      // closures only: no `function foo() {}`
      'func-style': ['error', 'expression'],
      'prefer-arrow-callback': 'error',
      'no-restricted-syntax': [
        'error',
        {selector: 'FunctionDeclaration', message: arrowMessage},
        {
          selector:
            'FunctionExpression:not(Property[method=true] > FunctionExpression, MethodDefinition > FunctionExpression)',
          message: arrowMessage
        }
      ],

      // camelCase values; PascalCase for components/types; camelCase only for hooks
      '@typescript-eslint/naming-convention': [
        'error',
        {selector: 'variable', format: ['camelCase', 'PascalCase', 'UPPER_CASE']},
        {selector: 'variable', filter: {regex: '^use[A-Z]', match: true}, format: ['camelCase']},
        {selector: ['variable', 'parameter'], modifiers: ['destructured'], format: null},
        {selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow'},
        {selector: 'typeLike', format: ['PascalCase']}
      ]
    }
  },
  prettier
]);
