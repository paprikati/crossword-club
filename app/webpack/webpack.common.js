const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../build'),
        publicPath: '/',
        chunkFilename: '[name].bundle.js',
        filename: 'bundle.js'
    },
    optimization: {
        sideEffects: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'] // loads js
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ['ts-loader'] // loads ts
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] // handles css
            }
        ]
    },
    // gets it to bundle index.html
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./public/index.html')
        })
    ],
    // makes it able to resolve .jsx calls without explicit suffix
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    }
};
