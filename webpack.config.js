const path = require('path');
const webpack = require('webpack');

const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'lib')
};

module.exports = {
    devtool: 'source-map',
    entry: PATHS.src,
    output: {
        path: PATHS.dist,
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'RSForm'
    },
    externals: {
        'react': 'react',
        'react-dom': 'react-dom',
        'rsuite-schema': 'rsuite-schema'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                query: {
                    //cacheDirectory: true,
                    presets: ['es2015', 'stage-0', 'react'],
                    plugins: [
                        "transform-proto-to-assign",
                        [
                            //https://gist.github.com/zertosh/4f818163e4d68d58c0fa
                            "transform-es2015-classes",
                            {
                                "loose": true
                            }
                        ]
                    ]
                },
                include: PATHS.src
            }
        ]
    }
};

