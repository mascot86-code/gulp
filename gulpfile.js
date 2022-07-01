const { parallel } = require("gulp");
const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const nano = require("gulp-cssnano");
const imgminify = require("gulp-imgminify");

gulp.task("sass", () => {
  return gulp.src("scss/*.scss").pipe(sass()).pipe(gulp.dest("css"));
});

gulp.task("min", () => {
  return gulp
    .src("scss/*.scss")
    .pipe(sass())
    .pipe(nano())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("build/css"));
});

gulp.task("pug", () => {
  return gulp.src("pug/*.pug").pipe(pug()).pipe(gulp.dest("."));
});

gulp.task("imgminify", () => {
  return gulp
    .src("img/**/*")
    .pipe(imgminify())
    .pipe(gulp.dest("build/img"));
});

gulp.task("sass-watch", () => {
  gulp.watch("scss/**/*.scss", parallel("sass"));
});

gulp.task("min-watch", () => {
  gulp.watch("scss/**/*.scss", parallel("min"));
});

gulp.task("pug-watch", () => {
  gulp.watch("pug/**/*.pug", parallel("pug"));
});

gulp.task(
  "default",
  parallel("sass", "sass-watch", "pug-watch", "min", "min-watch", "imgminify"),
);
