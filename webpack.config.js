const path = require('path');
const webpack = require('webpack');

const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
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
            },
            include: PATHS.src
        }
        ]
    }
}
