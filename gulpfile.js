var gulp = require('gulp');
var sass = require('gulp-sass');
var neat = require('node-neat').includePaths;
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var sassbeautify = require('gulp-sassbeautify');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');

var src = {
    sass:       'src/sass/**/*.scss',
    scripts:    'src/scripts/**/*.js',
    images:     'public/images/**/*'
};
var dest = {
    css:        'public/css',
    scripts:    'public/scripts',
    images:     'public/images'
};

// Gulp plumber error handler
var onError = function(err) {
    gutil.beep();
    gutil.log(err);
}

gulp.task('scripts', function() {
    gulp.src([
        './bower_components/jquery/dist/jquery.js',
        './bower_components/FitVids/jquery.fitvids.js',
        './bower_components/picturefill/dist/picturefill.js',
        './src/scripts/global.js'
    ])
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(sourcemaps.init())
    .pipe(concat('global-min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest.scripts))
    .pipe(browserSync.stream());
});

gulp.task('images', function() {
    gulp.src(src.images)
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(imagemin())
    .pipe(gulp.dest(dest.images));
});

gulp.task('sass', function() {
    gulp.src(src.sass)
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed',
        includePaths: ['sass'].concat(neat)
    }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest.css))
    .pipe(browserSync.stream());
});

gulp.task('pretty', function() {
    gulp.src(src.scss)
        .pipe(sassbeautify({
            indent: 4
        }))
        .pipe(gulp.dest('./src/sass'));
});

gulp.task('serve', ['sass', 'scripts'], function() {
    browserSync.init({
        proxy: ''
    });
    gulp.watch(src.sass, ['sass']);
    gulp.watch(src.scripts, ['scripts']);
    gulp.watch([
        'path/to/templates/*.html'
    ])
    .on('change', browserSync.reload);
});
