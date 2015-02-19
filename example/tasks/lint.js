module.exports = function(gulp, config){
  var
    jshint   = require('gulp-jshint');

  gulp.task('lint', function(){
    return gulp.src(['./index.js', './tasks/*.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
  });
};