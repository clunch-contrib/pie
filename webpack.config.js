module.exports = {
    entry: ['./test/index.js'],
    output: {
        path: __dirname,
        filename: 'test/dist.js',
    },
    module: {
        rules: [{
            test: /\.clunch$/,
            loader: ['clunch/loader.js']
        }]
    },
    devServer: {
        contentBase: './',
        compress: true,
        host: '0.0.0.0',
        port: '20000',
        hot: true,
        inline: true,
        historyApiFallback: true,
        disableHostCheck: true,
        watchOptions: {
            poll: true,
            ignored: /node_modules/,
            aggregateTimeout: 300
        }
    },
    mode: 'development'
};
