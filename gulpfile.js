var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    package = require('./package.json');

var banner = [
  '/*!\n' +
  ' * <%= package.name %>\n' +
  ' * <%= package.title %>\n' +
  ' * <%= package.url %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');

gulp.task('css', function () {
    return gulp.src('public/sass/app.scss')
    .pipe(sass({sourcemap: true, sourcemapPath: 'public/dist/css/'}))
      .on('error', function (err) { console.log(err.message); })    
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('public/dist/css/'))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('public/dist/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('compress-app', function(){
    return gulp.src('public/js/**/*.js')
        .pipe(concat('eLycee.js'))
        .pipe(gulp.dest('public/dist/js'))
        .pipe(rename('eLycee.js'))
        .pipe(uglify())
        .pipe(header(banner, { package : package }))
    	.pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/dist/js'));
});

//Keep Updated with new libs
gulp.task('compress-vendors', function() {
	return gulp.src([
		'public/bower_components/angular/angular.min.js',
		'public/bower_components/angular-route/angular-route.min.js',
		'public/bower_components/angular-animate/angular-animate.min.js',
		'public/bower_components/semantic-ui/dist/semantic.min.js',
		'public/bower_components/angular-growl-2/build/angular-growl.min.js',
		'public/bower_components/angular-local-storage/dist/angular-local-storage.min.js',
		'public/bower_components/angular-resource/angular-resource.min.js',
		'public/bower_components/angular-sanitize/angular-sanitize.min.js',
		'public/bower_components/jquery/dist/jquery.min.js',
		'public/bower_components/ngmap/build/scripts/ng-map.min.js',
		//Add future bower dependencies here ;)
	]).pipe(concat('vendors.js'))
	.pipe(gulp.dest('public/dist/vendors'))
    .pipe(rename('vendors.js'))
    .pipe(uglify())
    .pipe(header(banner, { package : package }))
	.pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('public/dist/vendors'));
})

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: 'public',
            routes: {
                '/bower_components': '../bower_components'
            }
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['css', 'compress-app', 'compress-vendors', 'browser-sync'], function () {
    gulp.watch("public/sass/*.scss", ['css']);
    gulp.watch("public/js/**/*.js", ['compress-app', 'compress-vendors']);
    gulp.watch("public/*.html", ['bs-reload']);
});