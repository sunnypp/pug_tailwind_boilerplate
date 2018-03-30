var gulp = require('gulp');
var pug = require('gulp-pug');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var tailwindcss = require('tailwindcss');
var autoprefixer = require('autoprefixer');

gulp.task('pug', () => (
  gulp.src([ 'src/**/*.pug', '!src/_includes/**/*.pug' ])
    .pipe(pug({
      doctype: 'html',
      pretty : true
    }))
    .pipe(rename(function(path) {
      if ( path.dirname == '.' && path.basename == "index" ) {
        return path;
      }

      var filename  = path.basename;
      path.basename = 'index';
      path.extname  = '.html';
      path.dirname  = `${path.dirname}/${filename}`;
      return path;
    }))
    .pipe(gulp.dest('public_html'))
))

gulp.task('css', function () {
  return gulp.src('src/assets/css/styles.css')
    .pipe(postcss([
      tailwindcss('./tailwind.js'),
      autoprefixer,
    ]))
    .pipe(gulp.dest('public_html/css'));
});

gulp.task('default', [
  'pug',
  'css'
])
