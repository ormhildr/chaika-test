const gulp = require("gulp");
const sync = require("browser-sync").create();

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: './'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

exports.default = gulp.series(
  server
);
