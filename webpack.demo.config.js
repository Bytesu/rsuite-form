const path = require('path');
const webpack = require('webpack');

const PATHS = {
    src: path.join(__dirname, 'demo'),
    dist: path.join(__dirname, 'build')
};

module.exports = {
    devtool: 'eval',
    entry: PATHS.src,
    output: {
        path: PATHS.dist,
        filename: 'bundle.js'
    },
    devServer: {
        hot: true,
        inline: true,
        contentBase: PATHS.dist
    },
    module: {
        loaders: [
        {
            test: /\.jsx?$/,
            loader: 'babel',
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'stage-0', 'react']
            }
        }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};

