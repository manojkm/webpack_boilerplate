const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


var APP_DIR = path.resolve(__dirname, './app');
var BUILD_DIR = path.resolve(__dirname, './dist');

module.exports = {

    // The base path which will be used to resolve entry points
    context: APP_DIR,

    // An entry point. It’s the main module of your application
    // that references all the other modules
    entry: {
        app: './src/index', // file extension after index is optional for .js files
        about: './src/js/about'

        // Got the below from gitter https://gitter.im/webpack/webpack?source=all-rooms-list (Learn)
        // embed: [
        //     './src/scss/about.scss',
        //     './src/scss/main.scss'
        // ]
    },

    output: {
        // The directory where the bundle should be placed.
        // __dirname refers to the directory where this webpack.config.js lives
        path: BUILD_DIR,
        // The name of the resulting bundle based on keys in entry above
        filename: 'js/[name].bundle.[chunkhash].js',
        sourceMapFilename: '[file].map',  // I am still not sure.. seems not working ?
        publicPath: '/assets' // This is used to generate URLs to e.g. images
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
                test : /\.(woff|woff2|eot|ttf|otf)$/, //Learn in detail later.. I don't know whats happening
                use : {
                    loader : 'file-loader',
                    options : {
                        name : './font/[name].[ext]'
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,   // The exclude pattern is important so that we don't apply babel transform to all the dependencies!
                use: ['babel-loader'] // process *.js files using babel-loader
            }
        ]

    },

    resolve: {
        // you can now require('file') instead of require('file.coffee')
        extensions: ['*', '.js', '.json', '.coffee']
    },

    plugins: [
        new CleanWebpackPlugin([BUILD_DIR]),
        new ExtractTextPlugin(
            {
                filename: 'css/[name].[chunkhash].css'
            }
        ), // Output name
        new HtmlWebpackPlugin({
            // title: 'Production',
            filename: 'index.html',  // Output name
            template: './src/views/index.html', // Path
            description: 'TEST DESCRIPTION',
            extraFiles: {
                css: 'static/css/bootstrap.min.css' // Learning..... Usage on index.html <%= htmlWebpackPlugin.options.extraFiles.css %>
            },
            chunks: ['app']
        }),
        new HtmlWebpackPlugin({
            // title: 'Production',
            filename: 'about.html',  // Output name
            template: './src/views/about.html', // Path
            chunks: ['about']
        }),
        new webpack.ProvidePlugin({ // It scans the source code for the given identifier and replaces it with a reference to the given module
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new CopyWebpackPlugin([
            {from: './src/robots.txt'}
        ]),

        new webpack.optimize.CommonsChunkPlugin({ //Learn in detail later.. I don't know whats happening
            name: 'common',
            minChunks: 2,
        })
    ]

};
