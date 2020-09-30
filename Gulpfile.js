
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const stylus = require('gulp-stylus');
const browserSync = require('browser-sync');

function html() {
  return gulp.src('./src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
}

function styles() {
  return gulp.src('./src/styles/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
}

function browser() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });

  gulp.watch(['./src/*.html'], html);
  gulp.watch(['./src/styles/*.styl'], styles);
}

gulp.task('html', html);

gulp.task('styles', styles);

gulp.task('browser-sync', browser);

gulp.task('start', gulp.series(html, styles, browser));
