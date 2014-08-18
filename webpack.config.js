module.exports = {
    context: __dirname + '/tmp',
    entry: './main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'es6-loader' }
        ]
    }
}
