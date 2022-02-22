const gulp = require("gulp");
const postcss = require("gulp-postcss");
const concat = require("gulp-concat");
const pc = require("postcss");
const browserSync = require("browser-sync");
const server = browserSync.create();
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const cleanCss = require("gulp-clean-css");

gulp.task("browser-sync", function (done) {
  server.init({
    server: {
      baseDir: "./",
    },
  });
  done();
});

gulp.task("css", function () {
  return gulp
    .src(`tailwind.css`)
    .pipe(postcss([pc(tailwindcss()), autoprefixer()]))
    .pipe(cleanCss({ level: 2 }))
    .pipe(concat("output.css"))
    .pipe(gulp.dest("."))
    .pipe(server.stream());
});

gulp.task(
  "watch",
  function () {
    gulp.watch(["./index.html", "./tailwind.css"], gulp.series("css")).on("change", server.reload);
  }
);

gulp.task("default", gulp.series("css", "browser-sync", "watch"));
