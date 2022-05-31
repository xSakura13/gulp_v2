const {src, dest, series, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssO = require('gulp-csso');
const htmlMin = require('gulp-htmlmin');
const del = require('del');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const jsMin = require('gulp-jsmin');
const paths = {
    style: {
        src: 'src/assets/scss/**.scss',
        dest: 'dist/assets/css/'
    },
    html: {
        src: 'src/html/**.html',
        dest: 'dist/html/'
    },
    img: {
        src: 'src/assets/img/*',
        dest: 'dist/assets/img'
    },
    js: {
        src: 'src/js/**.js',
        dest: 'dist/js/'
    }
}
function minJs() {
    return src(paths.js.src)
        .pipe(jsMin())
        .pipe(dest(paths.js.dest))
}
function imgMin() {
    return src(paths.img.src)
        .pipe(imagemin())
        .pipe(dest(paths.img.dest))
}
function html(){
    return src(paths.html.src)
        .pipe(htmlMin({
            collapseWhitespace: true
        }))
        .pipe(dest(paths.html.dest))
}
function scss(){
    return src(paths.style.src)
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cssO())
        .pipe(concat('style.css'))
        .pipe(dest(paths.style.dest))
}
function clear(){
    return del('dist')
}
exports.build = series(clear, parallel(scss, html, minJs, imgMin));