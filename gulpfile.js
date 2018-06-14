var postcss = require('gulp-postcss');
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');

//style paths
var sassFiles = 'resources/sass/*.scss',
    cssDest = 'resources/css/';

gulp.task('watch', function() {
  gulp.watch(sassFiles, gulp.series('styles'));
});

gulp.task('styles', function() {
  var plugin = [
    //PostCSS Plugins Here
    autoprefixer()
  ];
  return gulp.src(sassFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugin))
    .pipe(gulp.dest(cssDest));
});

gulp.task('default', gulp.series('styles', 'watch'));
