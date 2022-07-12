module.exports = {
  extends: ['next/core-web-vitals', 'airbnb', 'airbnb/hooks'],
  plugins: ['react', '@typescript-eslint', 'unused-imports'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    /**
     * Basic linting
     */
    'max-len': ['error', 120, { ignoreComments: true }],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'consistent-return': 'off',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
    }],
    'eol-last': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'object-curly-newline': ['error', {
      ImportDeclaration: 'never',
      ObjectPattern: {
        multiline: true,
        minProperties: 5,
      },
      ExportDeclaration: {
        multiline: true,
        minProperties: 5,
      },
    }],
    'space-before-blocks': ['error', {
      functions: 'always', keywords: 'always', classes: 'always',
    }],
    'space-before-function-paren': ['error', {
      anonymous: 'never', named: 'never', asyncArrow: 'always',
    }],
    'no-multi-spaces': ['error'],
    'no-param-reassign': 'off',
    'no-trailing-spaces': ['error'],
    'no-multiple-empty-lines': ['error', { max: 1 }],

    /**
     * Imports
     */
    'unused-imports/no-unused-imports': 'warn',
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],

    /**
     * React and JSX
     */
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/jsx-max-props-per-line': ['error', { maximum: 1 }],
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-closing-bracket-location': ['error'],
    'react/jsx-closing-tag-location': ['error'],
    'react/jsx-sort-props': ['warn', {
      callbacksLast: true,
      shorthandLast: true,
      noSortAlphabetically: true,
      reservedFirst: true,
    }],
    'react/function-component-definition': ['error', {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function',
    }],
  },
}
