var gulp = require('gulp');
var connect = require('connect');


/**
 * Three servers, one shared to serve the shared
 * source code. One for the runner and one for
 * the child iframe.
 */
gulp.task('example', function() {
  connect()
    .use(connect.static('./src/'))
    .listen(3000);

  connect()
    .use(connect.static('./example/runner/'))
    .listen(3001);

  connect()
    .use(connect.static('./example/embedded/'))
    .listen(3002);
});
