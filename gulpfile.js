// include the required packages.
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var inlinesource = require('gulp-inline-source');
var cssmin = require('gulp-cssmin');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');

var babel = require('gulp-babel');
var reload = browserSync.reload;

gulp.task('stylus', function () {
    return gulp.src('./src/styl/main.styl')
        .pipe(plumber())
        .pipe(stylus({
            paths        : ['./assets/img'],
            url          : 'embedurl',
            'include css': true,
        }))
        .pipe(postcss([
            autoprefixer,
            mqpacker
        ]))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssmin())
        .pipe(gulp.dest('./assets/css'))
        .pipe(reload({stream: true}));
});

gulp.task('javascript', function () {
    return gulp.src([
        './src/js/**/*.js',
    ])
        .pipe(plumber())
        .pipe(babel({
            presets: ['babel-preset-es2015'],
            ignore: 'lib/*.js'
        }))
        .pipe(concat('scripts.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js'))
        .pipe(reload({stream: true}));
});

gulp.task('html', function () {
    var options = {
        compress: false
    };

    return gulp.src('./src/**/*.html')
        .pipe(plumber())
        .pipe(inlinesource(options))
        .pipe(gulp.dest('./'))
        .pipe(reload({stream: true}));
});

// Default
gulp.task('default', function () {

    browserSync({
        server: "./",
        notify: false,
        ghostmode: false,
    });

    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/styl/**/*.styl', ['stylus']);
    gulp.watch('src/js/*.js', ['javascript']);
});

gulp.task('build', function () {
    var options = {
        compress: false
    };
    return gulp.src('src/**/*.html')
        .pipe(inlinesource(options))
        .pipe(gulp.dest('./'));
});
