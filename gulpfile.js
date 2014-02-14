var gulp = require('gulp');
var connect = require('connect');

gulp.task('server', function() {
  connect()
    .use(connect.static('./src/'))
    .listen(3000);
});
