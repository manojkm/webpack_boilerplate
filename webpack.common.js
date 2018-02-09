const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var APP_DIR = path.resolve(__dirname, './app/src');     // __dirname refers to the directory where this webpack.config.js lives
var BUILD_DIR = path.resolve(__dirname, './app/dist');

module.exports = {

    // The base path which will be used to resolve entry points
    context: APP_DIR,

    // An entry point. It’s the main module of your application
    // that references all the other modules
    entry: {

        // Multiple files, bundled together example
        // app: ['./home.js', './events.js', './vendor.js'],

        //Multiple files, multiple outputs
        app: './index', // file extension after index is optional for .js files
        about: './js/about'

        // Got the below from gitter https://gitter.im/webpack/webpack?source=all-rooms-list (Learn)
        // embed: [
        //     './src/scss/about.scss',
        //     './src/scss/main.scss'
        // ]
    },

    output: {
        path: BUILD_DIR, // The directory where the bundle should be placed.
        filename: './js/[name].bundle.[chunkhash].js',  // The name of the resulting bundle based on keys in entry above. [name] gets replaced with the object key from entry
        sourceMapFilename: '[file].map',
        publicPath: '', // This is used to generate URLs to e.g. images

        // this all related to source maps - Learn later
        devtoolModuleFilenameTemplate: '[resourcePath]',
        devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', // inject CSS to page
                    //use: ['css-loader', 'postcss-loader']  // Here Loaders are applied from right to left

                    use: [ // Here Loaders are applied from bottom to top
                        {loader: 'css-loader', options: {sourceMap: true}}, // The css-loader also takes care of minification when called in the production mode (-p) e.g webpack -p
                        {loader: 'postcss-loader', options: {sourceMap: true}}
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader', options: {sourceMap: true}},// translates CSS into CommonJS modules
                        {loader: 'postcss-loader', options: {sourceMap: true}},  // Run post css actions
                        {
                            loader: 'sass-loader', options: {sourceMap: true},
                        } // compiles Sass to CSS
                    ]
                })
            },
            {
                test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    }
                }
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                exclude: /node_modules/,
                use: [
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         name: '[path][name].[ext]'
                    //     }
                    // },

                    {
                        loader: 'url-loader',
                        options: {limit: 10000, name: '[name]-[hash].[ext]'}
                    },
                    {
                        loader: 'image-webpack-loader', //Minify PNG, JPEG, GIF, SVG and WEBP images
                        options: {bypassOnDebug: true}
                    }
                ]
            },
            {
                // HTML LOADER
                test: /\.html$/,
                loader: 'html-loader'
            },


            {
                test: /\.js$/,
                exclude: /node_modules/,   // The exclude pattern is important so that we don't apply babel transform to all the dependencies!
                use: ['babel-loader'] // process *.js files using babel-loader
            }
        ]

    },

    resolve: { // Check this later.. bit advanced https://github.com/JedWatson/react-select/issues/176
        // you can now require('file') instead of require('file.coffee')
        extensions: ['*', '.js', '.json', '.coffee']
    },

    plugins: [
        new CleanWebpackPlugin([BUILD_DIR]),
        new ExtractTextPlugin(
            {
                filename: 'css/[name].bundle.[chunkhash].css' // Output name
            }
        ),
        new webpack.ProvidePlugin({ // It scans the source code for the given identifier and replaces it with a reference to the given module
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            'windows.jQuery': 'jquery'
        }),

        new webpack.optimize.CommonsChunkPlugin({ // http://tips.tutorialhorizon.com/2016/11/07/webpack-commonschunkplugin-htmlwebpackplugin-setup/
            name: 'commons',
            filename: './js/commons-[hash].js',
            chunks: ['app'], // The order of this array matters. Make sure the name matches the entry name above.
            minChunks: 2,
        }),

        new HtmlWebpackPlugin({
            // title: 'Production',
            filename: 'index.html',  // Output name
            template: './views/index.html', // Path
            description: 'TEST DESCRIPTION',
            extraFiles: {
                css: 'static/css/bootstrap.min.css' // Learning..... Usage on index.html <%= htmlWebpackPlugin.options.extraFiles.css %>
            },
            chunks: ['commons', 'app'] // The order of this array matters
        }),
        new HtmlWebpackPlugin({
            // title: 'Production',
            filename: 'about.html',  // Output name
            template: './views/about.html', // Path
            chunks: ['about']
        }),

        new CopyWebpackPlugin([
            {from: './robots.txt'}
        ])


    ]

};
