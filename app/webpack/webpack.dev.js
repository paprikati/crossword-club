const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const IgnoreNotFoundExportPlugin = require('ignore-not-found-export-webpack-plugin');
const ModuleDependencyWarning = require('webpack/lib/ModuleDependencyWarning');

class IgnoreNotFoundExportPlugin {
    apply(compiler) {
        const messageRegExp = /export '.*'( \(reexported as '.*'\))? was not found in/;
        function doneHook(stats) {
            stats.compilation.warnings = stats.compilation.warnings.filter(function(warn) {
                if (warn instanceof ModuleDependencyWarning && messageRegExp.test(warn.message)) {
                    return false;
                }
                return true;
            });
        }
        if (compiler.hooks) {
            compiler.hooks.done.tap('IgnoreNotFoundExportPlugin', doneHook);
        } else {
            compiler.plugin('done', doneHook);
        }
    }
}

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        clientLogLevel: 'error',
        historyApiFallback: {
            rewrites: [{from: /^\/$/, to: '/'}, {from: '/*', to: '/'}]
        },
        inline: true,
        contentBase: './build',
        watchContentBase: true,
        port: 3000,
        proxy: {
            '/api': 'http://localhost:6000',
            '/auth': 'http://localhost:6000'
        }
    },
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
                                'primary-color': '#5c31a8' // injects purple into antd for dev mode
                            },
                            javascriptEnabled: true
                        }
                    }
                ]
            }
        ]
    },
    // gets it to bundle index.html
    plugins: [new IgnoreNotFoundExportPlugin(), new BundleAnalyzerPlugin({analyzerPort: 8000, openAnalyzer: false})]
});
