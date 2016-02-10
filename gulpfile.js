var addsrc = require('gulp-add-src');
var autoprefixer = require('gulp-autoprefixer');
var bowerFiles = require('bower-files')();
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var gulp = require('gulp');
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var neat = require('node-neat').includePaths;
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sassbeautify = require('gulp-sassbeautify');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

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

gulp.task('bower', function() {
    gulp.src(bowerFiles.ext('js').files)
    .pipe(concat('_vendor.js'))
    .pipe(gulp.dest('src/scripts'));
});

gulp.task('scripts', function() {
    gulp.src([
        './src/scripts/global.js'
    ])
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(sourcemaps.init())
    .pipe(addsrc.prepend('./src/scripts/_vendor.js'))
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
    .pipe(stripcomments())
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

gulp.task('serve', ['sass', 'bower', 'scripts'], function() {
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
