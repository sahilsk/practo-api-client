var gulp = require('gulp');
var mocha = require('gulp-mocha');
var beautify = require('gulp-beautify');

gulp.task('test', function () {
    return gulp.src('test/test.js', {read: false})
        .pipe(mocha({reporter: ''}));
});

gulp.task('beautify', function() {
  gulp.src('./src/*.js')
    .pipe(beautify({indentSize: 2}))
    .pipe(gulp.dest('./src/'))
});

// Rerun the task when a file changes 
gulp.task('watch', function() {
  gulp.watch(['src/*', 'test/*'], ['test']);
});

gulp.task('default', ['test'])