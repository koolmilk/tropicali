var gulp = require('gulp')
var sass = require('gulp-sass')
var cleanCSS = require('gulp-clean-css')
var sourcemaps = require('gulp-sourcemaps');

var imagemin = require('gulp-imagemin');

var browserSync = require('browser-sync').create()

sass.compiler = require('node-sass')

//Task SASS
gulp.task("sass", function () {
    //we want to run "sass css/app.scss app.css --watch"
    return gulp.src("src/css/app.scss")
        .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream())
})

//Task HTML
gulp.task("html", function() {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("dist"))
}) 

//Task FONTS
gulp.task("fonts", function() {
    return gulp.src("src/fonts/*")
        .pipe(gulp.dest("dist/fonts"))
})

//Task IMAGES
gulp.task("images", function() {
    return gulp.src("src/img/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"))
})

//Task WATCH
gulp.task("watch", function () {


    browserSync.init({
        server: {
            baseDir: "dist"
        }
    })


    gulp.watch("src/*.html", gulp.series("html")).on("change", browserSync.reload)
    gulp.watch("src/css/app.scss", gulp.series("sass"))
    gulp.watch("src/fonts/*", gulp.series("fonts"))
    gulp.watch("src/img/*", gulp.series("images"))
    
})

gulp.task('default', gulp.series("html", "sass", "fonts","images", "watch"))

