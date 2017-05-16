/**
 * Created by Curso on 16/05/2017.
 */

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');


gulp.task('compile-js',function() {
    return browserify('./src/js/main.js')
        //.transform(babelify)
        .bundle()
        .pipe(source('all-min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});
