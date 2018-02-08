const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const CompressionPlugin = require('compression-webpack-plugin');


module.exports = merge(common, {
    devtool: 'source-map',

    module: {
        loaders: [
        ]
    },

    plugins: [
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),

        // new UglifyJSPlugin({
        //     sourceMap: true
        // }),

        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            sourceMap: true,
            output: {
                comments: false,
                beautify: false
            },
            compress: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true,
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: true,
                warnings: false // Suppress uglification warnings
            }
        }),

        new CompressionPlugin({ // Got from https://stackoverflow.com/questions/35054082/webpack-how-to-build-production-code-and-how-to-use-it
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),

        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify('production')
        // }),

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
});
