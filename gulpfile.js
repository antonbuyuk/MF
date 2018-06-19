var gulp = require('gulp');
	pug = require('gulp-pug');
	less = require('gulp-less');
	autoprefixer = require('gulp-autoprefixer');
	minifyCSS = require('gulp-csso');
	concat = require('gulp-concat');
	image = require('gulp-image');
	uglify = require('gulp-uglify');
	util = require('gulp-util');
	jsonMinify = require('gulp-json-minify');
	data = require('gulp-data'),
	fs = require('fs');
	rimraf = require('rimraf');//очистка
	sourcemaps = require('gulp-sourcemaps'); //sourcemaps
	rename = require("gulp-rename"); //переименвоание файлов
	plumber = require("gulp-plumber"); //предохранитель для остановки гальпа
	watch = require('gulp-watch'); //расширение возможностей watch
	connect = require('gulp-connect'); //livereload


var path = {
	build: { //Тут мы укажем куда складывать готовые после сборки файлы
		html: 'build/',
		htaccess: 'build/',
		js: 'build/templates/_ares/js/',
		css: 'build/templates/_ares/css/',
		componentsJs: 'build/templates/_ares/components/*/*.js',
		componentsCss: 'build/templates/_ares/components/*/*.css',
		fonts: 'build/templates/_ares/fonts/',
		image: 'build/templates/_ares/img/'
	},
	src: { //Пути откуда брать исходники
		html: 'src/*.pug',
		css: 'src/assets/less/*',
		js: 'src/assets/js/*',
		json: 'src/assets/json/*',
		componentsJs: 'src/assets/components/*/*.js',
		componentsCss: 'src/assets/components/*/*.css',
		fonts: 'src/assets/fonts/*/*',
		image: 'src/assets/img/*/*',
		htaccess: 'src/.htaccess'
	},
	watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
		html: 'src/includes/*',
		css: 'src/assets/less/*',
		js: 'src/assets/js/*',
		image: 'src/assets/img/*/*',
		fonts: 'src/assets/fonts/*/*',
		htaccess: 'src/.htaccess',
	},
	clean: './build', //директории которые могут очищаться
	outputDir: './build' //исходная корневая директория для запуска минисервера
};

  
// Локальный сервер для разработки
gulp.task('connect', function(){
    connect.server({ //настриваем конфиги сервера
        root: [path.outputDir], //корневая директория запуска сервера
        port: 9999, //какой порт будем использовать
        livereload: true //инициализируем работу LiveReload
    });
});

gulp.task('html:build', function() {
  return gulp.src(path.src.html)
    .pipe(pug())
    .pipe(gulp.dest(path.build.html));
});

gulp.task('css:build', function(){
  return gulp.src([
	(path.src.componentsCss),
	(path.src.css)
	])
    .pipe(less())
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(concat('styles.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.build.css))
});

gulp.task('js:build', function(){
  return gulp.src([
	(path.src.componentsJs),
	(path.src.js),
	])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
});

gulp.task('image:build', function () {
  gulp.src(path.src.image)
    .pipe(image())
    .pipe(gulp.dest(path.build.image));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts)) //выгружаем в build
});

gulp.task('htaccess:build', function() {
    gulp.src(path.src.htaccess)
        .pipe(gulp.dest(path.build.htaccess)) //выгружаем в build
});


// билдим все
gulp.task('build', [
    'html:build',
	'css:build',
	'js:build',
    'fonts:build',
	'image:build',
	'htaccess:build'
]);

// чистим папку билда
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

// watch
gulp.task('watch', function(){
     //билдим html в случае изменения
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
     //билдим css в случае изменения
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
     //билдим js в случае изменения
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
     //билдим статичные изображения в случае изменения
    watch([path.watch.image], function(event, cb) {
        gulp.start('image:build');
    });
     //билдим шрифты в случае изменения
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
     //билдим htaccess в случае изменения
    watch([path.watch.htaccess], function(event, cb) {
        gulp.start('htaccess:build');
    });
});

// действия по умолчанию
gulp.task('default', ['build','watch','connect']);