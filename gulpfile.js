// install all these packages below in the a package manager like Node (npm) or Bower. Typically npm is used for most of the back-end and front-end but bower is used for some front-end features like jquery and bootstraps to prevent confusion
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
// 'gulp-jshint' package needs a pair package to be installed allong with it called 'jshint'
var jshint = require('gulp-jshint');
var utilities = require('gulp-util');
// production is an environment variable which set to 'true' in the terminal by the command .... --production, it var buildProduction to 'true' otherwise it is false or null
var buildProduction = utilities.env.production;

// function() and construct() look similar. function() does something behind the scenes or return something. construct() creates an object but does not return anything. However construct().method() can do the same thing as a function()

// gulp is used to perform automated development tasks to prep our development js files and the instructions from the packages/classes/dependencies into finished production files that will be executed. Some dependencies are used for the development process alone and some others will need to be included in the final production files

// gulp-concat is used to concatenate all the front-end files in your project into one because it is easier/better for th program to execute from one js file as opposed to making several connections between the front-end files. The back end js files are "required"/included in the front-end js scripts
gulp.task('concat', function() {
  // ./ is used to reference the starting directory. ../ is used to go up one directory level. Keep updating and adding file paths in the gulp tasks throughout the dev process
  // var gulp is the "super class/object". its method '.src()' fetches a list of the front-end files to be concatenated seperated by commas.
  return gulp.src([ './js/*-interface' ])
    // '.pipe()' is another "method of the gulp class" that returns the element on the left to the element on the right
    // var concat is a seperate "function or class/object" that comes from a dependency/imported class/package that concats the subject js files passed to it and then creates a new object file from them called allConcat.js
    .pipe(concat('allConcat.js'))
    // allConcat.js is return to gulp.dest() which creates a destination folder at the same level in the directory that this file (gulpfile.js) is in
    .pipe(gulp.dest('./tmp'));
});

// del() is an "imported function" that deletes the folders in the argument. The clean gulp task should be used before the jsBrowserify gulp task where new tmp and build files are created
gulp.task('clean', function() {
  return del(['build', 'tmp'])
});

// browserify is used to turn a js file into a language that the browser can understand. Some statements in the js files e.g require are not understood by chrome
// there are 3 arguments in this gulp task: the task name, the pre-tasks and the function to execute when this task name is called. It more efficient to browserify the concatenated js files than vice-versa. The pre-task argument can be left empty if none are needed for instance if you are only working with one front-end js file
gulp.task('jsBrowserify', ['concat', 'clean'], function() {
  // browserify the concatenated js file
  // var browserify is an "imported class/object". .bundle() is a method of browserify that returns the production file (likely after type-casting it into a gulp object so we can apply .pipe() method to it)
  return browserify({ entries :['./tmp/allConcat.js']})
    .bundle()
    // source() is an "imported function" that creates a file 'app.js'. .pipe() passes the browserified production file into app.js and saves it in another js folder in 'build' build has the completed production files to be executed
    .pipe(source('app.js'))
    .pipe.dest('./build/js')
});

// uglify() is an "imported function" that converts the variables in the browserified app.js file into single letter variables that the browser can analyze faster
gulp.task('minifyScripts', ['clean'], function() {
  return gulp.src('.build/js/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('.build/js'))
});

// build gulp task is used to streamline the dev process so that you can develop prodcution files and development files seperately as needed. Forexample, if you have already concatenated your js files into production build app.js files, then there is no need to take that route again etc.
gulp.task('build', function() {
  // when buildProduction is 'true' take the minifyScripts path to work with production files only
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
    gulp.start('minifyScripts');
  }
});

// jshint is a seperate gulf task that can be run at any point in the dev process to clean up your typically non-fatal errors in the .js files that could cause errors later e.g during concatenation
// jshint() is the
gulp.task('jshint', function() {
  return gulp.src([ './js/*.js' ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
