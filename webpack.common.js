const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {

    context: path.resolve('./app'),

    // An entry point. It’s the main module of your application
    // that references all the other modules
    entry: {
        app: './src/index.js',
        about: './src/js/about.js'
    },

    output: {
        // The directory where the bundle should be placed.
        // __dirname refers to the directory where this webpack.config.js lives
        path: path.resolve(__dirname, 'dist'),
        // The name of the resulting bundle
        filename: 'js/[name].bundle.js',
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                // use: [
                //     'style-loader',
                //     'css-loader',
                //     'postcss-loader'
                // ]

                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    // use: ['css-loader', 'postcss-loader']
                    use: [
                        {loader: 'css-loader', options: {sourceMap: true}},
                        {loader: 'postcss-loader', options: {sourceMap: true}}
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',

                    // Loaders are applied from right to left
                    // use: ['css-loader', 'postcss-loader', 'sass-loader']

                    use: [
                        {loader: 'css-loader', options: {sourceMap: true}},
                        {loader: 'postcss-loader', options: {sourceMap: true}},
                        {loader: 'sass-loader', options: {sourceMap: true}}
                    ]
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]

    },

    plugins: [
        new CleanWebpackPlugin(['./dist']),
        new ExtractTextPlugin('css/styles.css'), // Output name
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
        })
    ]

};
