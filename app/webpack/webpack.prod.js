const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            modifyVars: {
                                'primary-color': '#05386B' // injects blue into antd for dev mode
                            },
                            javascriptEnabled: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [new BundleAnalyzerPlugin({analyzerPort: 8080, openAnalyzer: true})]
});
