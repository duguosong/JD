var gulp = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel')
/*gulp.task("hello",function(){
	console.log("杜国松")
});
gulp.task("wo",function(){
	console.log("111")
})*/

/*gulp.task('default',function(){
	console.log("杜国松")
})*/
//gulp.task('default',['hello','wo'])
/*gulp.task('imgs',  function(){
	gulp.src('img/**').pipe(gulp.dest("dist"))
	
})*/
gulp.task('coyData',function(){
	gulp.src(['js/*.js']).pipe(gulp.dest('dist/js'))
})
gulp.task('coyhtml',function(){
	gulp.src('register.html').pipe(gulp.dest('dist')).pipe(connect.reload())
})
gulp.task('sass',function(){
	gulp.src('sass/register.scss')
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(cleanCss())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('dist/css'))
})
/*gulp.task('concat',function(){
	gulp.src('js/*.js')
	.pipe(concat('index.js'))
	.pipe(gulp.dest('dist/js'))
})*/
/*gulp.task('uglify',function(){
	gulp.src('js/*.js')
	.pipe(concat('index.js'))
	.pipe(gulp.dest('dist/js'))
	.pipe(uglify())
	.pipe(rename('index.min.js'))
	.pipe(gulp.dest('dist/js'))
})*/
gulp.task('uglify',function(){
	gulp.src('js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
	.pipe(rename({suffix:'min'}))
	.pipe(gulp.dest('dist/js'))
})
gulp.task('imagemin',function(){
	gulp.src('img/**')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'))
})
gulp.task('babel',function(){
	gulp.src('js/*.js')
	.pipe(babel({"presets":["es2015"]}))
	.pipe(gulp.dest('dist/js'))
})
gulp.task('build',['coyData','coyhtml','sass','uglify','imagemin','babel'])
gulp.task('watch',function(){
	//gulp.watch('index.html',['coyhtml'])
	console.log("杜国松")
	gulp.watch(['register.html','js/*.js','sass/register.scss','img/**'],['coyhtml','coyData','sass','imagemin'])
})


gulp.task('server',function(){
	connect.server({
		root:'dist',
		livereload:true
		})
})
gulp.task('default',['watch','server'])
