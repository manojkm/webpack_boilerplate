const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


var APP_DIR = path.resolve(__dirname, './app');
var BUILD_DIR = path.resolve(__dirname, './dist');

module.exports = {
    context: APP_DIR,
    // An entry point. It’s the main module of your application
    // that references all the other modules
    entry: {
        app: './src/index', // file extension after index is optional for .js files
        about: './src/js/about'
    },

    output: {
        // The directory where the bundle should be placed.
        // __dirname refers to the directory where this webpack.config.js lives
        path: BUILD_DIR,
        // The name of the resulting bundle
        filename: 'js/[name].bundle.[chunkhash].js',
        sourceMapFilename: '[file].map',  // I am still not sure.. seems not working ?
        publicPath: '/'
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //use: ['css-loader', 'postcss-loader']  // Loaders are applied from right to left
                    use: [
                        {loader: 'css-loader', options: {sourceMap: true}},
                        {loader: 'postcss-loader', options: {sourceMap: true}}
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', // inject CSS to page
                    use: [
                        {loader: 'css-loader', options: {sourceMap: true}},// translates CSS into CommonJS modules
                        {loader: 'postcss-loader', options: {sourceMap: true}},  // Run post css actions
                        {loader: 'sass-loader', options: {sourceMap: true}} // compiles Sass to CSS
                    ]
                })
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader', //Minify PNG, JPEG, GIF, SVG and WEBP images
                        options: {
                            bypassOnDebug: true,
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]

    },

    plugins: [
        new CleanWebpackPlugin([BUILD_DIR]),
        new ExtractTextPlugin(
            {
                filename: 'css/[name].css'
            }
        ), // Output name
        new HtmlWebpackPlugin({
            // title: 'Production'
            filename: 'index.html',  // Output name
            template: './src/views/index.html', // Path
            chunks: ['app']
        }),
        new HtmlWebpackPlugin({
            // title: 'Production'
            filename: 'about.html',  // Output name
            template: './src/views/about.html', // Path
            chunks: ['about']
        }),
        new webpack.ProvidePlugin({
            // inject ES5 modules as global vars
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new CopyWebpackPlugin([
            {from: './src/robots.txt'}
        ])
    ]

};
