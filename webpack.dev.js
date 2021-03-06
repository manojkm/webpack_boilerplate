const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, './app/dist');

module.exports = merge(common, {
    devtool: 'inline-source-map', // This will work only for JS files.
    devServer: { // Pass options to webpack-dev-server
        contentBase: BUILD_DIR
    },
    module: {
        loaders: [

        ]
    },
    plugins: [
        new BrowserSyncPlugin(
            // BrowserSync options
            {
                // browse to http://localhost:3000/ during development
                host: 'localhost',
                port: 3000,
                // proxy the Webpack Dev Server endpoint
                // (which should be serving on http://localhost:3100/)
                // through BrowserSync
                proxy: 'http://localhost:8080/'
            },
            // plugin options
            {
                // prevent BrowserSync from reloading the page
                // and let Webpack Dev Server take care of this
                reload: false
            }
        )
    ]
});
