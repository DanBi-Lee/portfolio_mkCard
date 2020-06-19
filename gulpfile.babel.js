import gulp from "gulp";
import del from "del";
import htmlTag from "gulp-html-tag-include";
import ws from "gulp-webserver";
import image from "gulp-image";
import sass from "gulp-sass";
import autoPrefixer from "gulp-autoprefixer";
import miniCSS from "gulp-csso";
import bro from "gulp-bro";
import babelify from "babelify";
import ghPages from "gulp-gh-pages";

sass.compiler = require("node-sass");

const routes = {
  html: {
    watch: "src/**/*.html",
    src: "src/*.html",
    dest: "build"
  },
  img: {
    src: "src/img/*",
    dest: "build/img"
  },
  scss: {
    watch: "src/scss/**/*.scss",
    src: "src/scss/*.scss",
    dest: "build/css"
  },
  js: {
    watch: "src/js/**/*.js",
    src: "src/js/**/*.js",
    dest: "build/js"
  }
};

const html = () =>
  gulp
    .src(routes.html.src)
    .pipe(htmlTag())
    .pipe(gulp.dest(routes.html.dest));


const clean = () => del(["build/", ".publish"]); //build를 위한 준비과정

const webserver = () => gulp.src("build").pipe(ws({ livereload: true }));

const img = () =>
  gulp
    .src(routes.img.src)
    .pipe(image())
    .pipe(gulp.dest(routes.img.dest));

const styles = () =>
  gulp
    .src(routes.scss.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoPrefixer())
    .pipe(miniCSS())
    .pipe(gulp.dest(routes.scss.dest));

const js = () => 
  gulp.src(routes.js.src)
  // .pipe(bro({
  //   transform: [
  //     babelify.configure({ presets: ['@babel/preset-env'] }),
  //     [ 'uglifyify', { global: true } ]
  //   ]
  // }))
  .pipe(gulp.dest(routes.js.dest));

const gh = () => gulp.src("build/**/*").pipe(ghPages());

const watch = () => {
  gulp.watch(routes.html.watch, html);
  gulp.watch(routes.img.src, img);
  gulp.watch(routes.scss.watch, styles);
  gulp.watch(routes.js.watch, js);
};

const prepare = gulp.series([clean, img]);

const assets = gulp.series([html, styles, js]);

const live = gulp.parallel([webserver, watch]);

export const build = gulp.series([prepare, assets]);
export const dev = gulp.series([build, live]);
export const deploy = gulp.series([build, gh, clean]);