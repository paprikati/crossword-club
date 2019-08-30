module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/react'
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import',
        [
            'import',
            {
                libraryName: 'antd',
                style: true
            }
        ]
    ],
    env: {
        test: {
            plugins: [
                'transform-es2015-modules-commonjs'
            ]
        }
    }
};
