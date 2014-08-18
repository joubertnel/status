var gulp = require('gulp');
var react = require('gulp-react');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var del = require('del');

var paths = {
    src: ['./src/**'],
    js: ['./src/*.js'],
    jsx: ['./src/**/*.jsx'],
    temp: './tmp',
    bundle: './dist'
};

var webpackCfg = {
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
};

gulp.task('jsx', function() {
    return gulp.src(paths.jsx).
        pipe(react()).
        pipe(gulp.dest(paths.temp));
});

gulp.task('scripts', ['jsx'], function() {
    return gulp.src(paths.js).
        pipe(gulp.dest(paths.temp));
});

gulp.task('bundle', ['scripts'], function(cb) {
    webpack(webpackCfg, function(err, stats) {
        cb();
    });
});

gulp.task('watch', function(cb) {
    gulp.watch(paths.src, ['bundle']);
});

gulp.task('server', ['bundle'], function(cb) {
    var cfg = Object.create(webpackCfg);
    cfg.devtool = 'eval';
    cfg.debug = true;

    new WebpackDevServer(webpack(cfg), {
        publicPath: '/' + cfg.output.publicPath,
        stats: { colors: true }
    }).listen(8080, 'localhost', function(err) {
        gulp.watch(paths.src, ['bundle']);
    });
});

gulp.task('default', ['bundle'], function() {
    console.log('Other options:');
    console.log('clean, jsx, scripts, bundle, watch, server');
});

gulp.task('clean', function(cb) {
    del([paths.temp, paths.bundle], cb);
});
