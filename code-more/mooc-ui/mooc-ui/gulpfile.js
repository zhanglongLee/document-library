const gulp = require("gulp");
const sass = require("gulp-sass")(require('sass')); // sass --> css
// const minifyCss = require("gulp-minify-css");// 压缩css
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");

gulp.task("sass",async function(){
  return gulp.src("components/css/**/*.scss")// 将需要处理的文件塞进去
    .pipe(sass())// sass转成css
    // .pipe(minifyCss())// css压缩
    .pipe(sourcemaps.init())
    .pipe(cleanCSS({
      debug: true,
      advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
      compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
      keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
    }, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/css"));// 输出目录
});
