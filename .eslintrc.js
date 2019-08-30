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
    plugins: ['react'],
    rules: {
        // 'react/jsx-uses-react': true,
        // 'react/jsx-uses-vars':true,
        indent: ['error', 4, {SwitchCase: 1, ignoredNodes: ['JSXElement']}],
        'linebreak-style': ['error', 'windows'],
        quotes: ['error', 'single', {allowTemplateLiterals: true}],
        semi: ['error', 'always'],
        'no-undef': ['error'],
        'no-unused-vars': 'warn',
        'array-bracket-spacing': ['error', 'never'],
        'comma-spacing': [
            'error',
            {
                before: false,
                after: true
            }
        ],
        'space-infix-ops': 'error',
        'space-before-function-paren': ['error', 'never'],
        'no-extra-semi': 'error',
        curly: ['error', 'multi-line', 'consistent'],
        yoda: 'error',
        'no-cond-assign': 'warn',
        'no-label-var': 'error',
        'no-shadow': [
            'error',
            {
                builtinGlobals: false,
                hoist: 'functions',
                allow: []
            }
        ],
        'array-bracket-newline': ['error', 'consistent'],
        'comma-dangle': ['error', 'never'],
        'brace-style': [
            'error',
            '1tbs',
            {
                allowSingleLine: true
            }
        ],
        'block-spacing': 'error',
        'computed-property-spacing': ['error', 'never'],
        'eol-last': ['error', 'always'],
        'key-spacing': [
            'error',
            {
                beforeColon: false,
                afterColon: true
            }
        ],
        'keyword-spacing': [
            'error',
            {
                before: true,
                after: true
            }
        ],
        'no-mixed-operators': 'error',
        'no-mixed-spaces-and-tabs': 'error',
        'no-nested-ternary': 'error',
        'no-trailing-spaces': 'error',
        'no-unneeded-ternary': 'error',
        'spaced-comment': ['error', 'always'],
        'no-constant-condition': 'warn',
        'no-empty': 'error',
        'no-irregular-whitespace': 'error',
        'no-unexpected-multiline': 'error',
        'valid-typeof': 'error',
        'block-scoped-var': 'error',
        'default-case': 'error',
        eqeqeq: 'error',
        'no-lone-blocks': 'error',
        'no-multi-spaces': 'error',
        'no-octal': 'error',
        'no-redeclare': 'error',
        'no-self-assign': 'error',
        'no-sequences': 'error',
        'no-undefined': 'warn',
        'max-len': ['error', {code: 130, tabWidth: 10, ignoreStrings: true}],
        'newline-per-chained-call': 'error',
        'no-mixed-spaces-and-tabs': 'error',
        'no-whitespace-before-property': 'error',
        'object-curly-newline': ['error', {consistent: true}],
        'object-curly-spacing': ['error', 'never'],
        'object-property-newline': ['error', {allowAllPropertiesOnSameLine: true}],
        'prefer-object-spread': 'error',
        'quote-props': ['error', 'as-needed'],

        // react
        'react/boolean-prop-naming': 'error',
        // "react/no-access-state-in-setstate":"error",
        'react/no-this-in-sfc': 'error',
        'react/prefer-stateless-function': 'error',
        'react/require-default-props': 'warn',
        'react/sort-prop-types': 'error',
        'react/sort-comp': 'error',
        'react/self-closing-comp': 'warn',
        'react/jsx-boolean-value': 'error',
        'react/jsx-child-element-spacing': 'warn',
        'react/jsx-closing-bracket-location': 'error',
        'react/prop-types': [0]
    },
    extends: ['plugin:react/recommended']
};
