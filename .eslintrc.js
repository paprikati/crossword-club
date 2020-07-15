module.exports = {
    env: {
        es6: true,
        browser: true,
        jest: true,
        node: true
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        allowImportExportEverywhere: true
    },
    plugins: ['react', 'react-hooks', 'simple-import-sort'],
    settings: { react: { version: '16.12.0' } },
    rules: {
        'no-underscore-dangle': 0,
        indent: ['error', 4, { SwitchCase: 1, ignoredNodes: ['JSXElement', 'JSXElement *'] }],
        quotes: ['error', 'single'],
        'quote-props': ['error', 'as-needed'],
        semi: ['error', 'always'],
        'no-undef': ['error'],
        'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'array-bracket-spacing': ['error', 'never'],
        'comma-spacing': ['error', { before: false, after: true }],
        'space-infix-ops': 'error',
        'space-before-function-paren': ['error', 'never'],
        'no-extra-semi': 'error',
        curly: ['error', 'multi-line', 'consistent'],
        yoda: 'error',
        'no-cond-assign': 'warn',
        'no-label-var': 'error',
        'no-shadow': ['error', { builtinGlobals: false, hoist: 'functions', allow: [] }],
        'array-bracket-newline': ['error', 'consistent'],
        'comma-dangle': ['error', 'never'],
        'brace-style': ['error', '1tbs', { allowSingleLine: true }],
        'block-spacing': 'error',
        'computed-property-spacing': ['error', 'never'],
        'eol-last': ['error', 'always'],
        'key-spacing': ['error', { beforeColon: false, afterColon: true }],
        'keyword-spacing': ['error', { before: true, after: true }],
        'no-mixed-operators': 'error',
        'no-mixed-spaces-and-tabs': 'error',
        'no-nested-ternary': 'error',
        'no-trailing-spaces': 'error',
        'no-unneeded-ternary': 'error',
        'spaced-comment': ['error', 'always'],
        'object-curly-spacing': ['error', 'always'],
        'no-unexpected-multiline': ['error'],
        'no-multi-spaces': ['error'],

        // react
        'react/boolean-prop-naming': 'error',
        'react/no-this-in-sfc': 'error',
        'react/prefer-stateless-function': 'error',
        'react/sort-comp': 'error',
        'react/self-closing-comp': 'warn',
        'react/jsx-boolean-value': 'error',
        'react/jsx-child-element-spacing': 'warn',
        'react/jsx-closing-bracket-location': 'error',
        'react/prop-types': [0],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn', // Checks useEffect dependencies
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-wrap-multilines': ['error', {
            declaration: 'parens-new-line',
            assignment: 'parens-new-line',
            return: 'parens-new-line',
            arrow: 'parens-new-line',
            condition: 'parens-new-line',
            logical: 'parens-new-line',
            prop: 'parens-new-line'
        }],

        // turn off some annoying rules
        'react/display-name': 'off',

        // sort imports
        'simple-import-sort/sort': 'error'
    },
    extends: ['plugin:react/recommended']
};
