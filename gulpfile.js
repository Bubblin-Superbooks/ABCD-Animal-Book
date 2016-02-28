var gulp = require('gulp');
var browserSync = require('browser-sync');
var handlebars = require('gulp-compile-handlebars');
var fs = require('fs');
var path = require('path');

// Gulp plugins
var concat = require('gulp-concat');
var gulpif = require('gulp-if');

// HTML preprocessors
var haml = require('gulp-haml');
var markdown = require('gulp-markdown');

// Style preprocessors
var sass = require('gulp-sass');
var less = require('gulp-less');
var stylus = require('gulp-stylus');
var postcss = require('gulp-postcss');

// JavaScript preprocessors

gulp.task('watchBook', function() {
  browserSync.init({
    server: "./",
    port: 4567,
    notify: false,
    host: 'bubblin.com'
  });

  gulp.watch(path.join('manuscript', '**', '*'), function(obj) {
    if (obj.type === 'deleted') {
      console.log(obj.type + " " + obj.path);
    } else {
      if (obj.type === 'added') {
        gulp.start('indexPage');

        var newPagePath = obj.path;
        var newPaths = newPagePath.split(path.sep),
          newPage = newPaths[newPaths.length - 1] === '' ? newPaths[newPaths.length - 2] : newPaths[newPaths.length - 1];

        gulp.src(path.join(newPagePath, '*'))
          .pipe(gulp.dest(path.join("build", "manuscript", newPage)))
          .on('end', function() {
            renderPage(newPage);
          });
      }
      if (obj.type === 'changed') {

        var pagePath = path.dirname(obj.path);
        var paths = pagePath.split(path.sep),
          page = paths[paths.length - 1];

        gulp.src(path.join(pagePath, '*'))
          .pipe(gulpif(/[.]haml$/, haml()))
          .pipe(gulpif(/[.]md$/, markdown()))

        .pipe(gulpif(/[.]scss|sass$/, sass()))
          .pipe(gulpif(/[.]less$/, less()))
          .pipe(gulpif(/[.]styl$/, stylus()))

        .pipe(gulp.dest(path.join('build', 'manuscript', page)))
          .on('end', function() {
            renderPage(page);
          });

      }
    }
  });

  gulp.watch(path.join('templates', '**.*'), function(obj) {
    gulp.start('renderBook');
  });

});

gulp.task('pages', function() {


  // gulp.src(path.join('manuscript', '*', '*.+(haml)'))
  //   .pipe(haml())
  //   .pipe(gulp.dest(path.join('build', 'manuscript')));

  // gulp.src(path.join('manuscript', '*', '*.+(md)'))
  //   .pipe(markdown())
  //   .pipe(gulp.dest(path.join('build', 'manuscript')));

  // gulp.src(path.join('manuscript', '*', '*.+(scss|sass)'))
  //   .pipe(sass())
  //   .pipe(gulp.dest(path.join('build', 'manuscript')));

  // gulp.src(path.join('manuscript', '*', '*.+(less)'))
  //   .pipe(less())
  //   .pipe(gulp.dest(path.join('build', 'manuscript')));

  // gulp.src(path.join('manuscript', '*', '*.+(styl)'))
  //   .pipe(stylus())
  //   .pipe(gulp.dest(path.join('build', 'manuscript')));

  // return gulp.src(path.join('manuscript', '*', '*.+(js|css|html)'))
  //   .pipe(gulp.dest(path.join('build', 'manuscript')));
  return gulp.src(path.join('manuscript', '*', '*'))
    .pipe(gulpif(/[.]haml$/, haml()))
    .pipe(gulpif(/[.]md$/, markdown()))
    .pipe(gulpif(/[.]scss|sass$/, sass()))
    .pipe(gulpif(/[.]less$/, less()))
    .pipe(gulpif(/[.]styl$/, stylus()))
    .pipe(gulp.dest(path.join('build', 'manuscript')));

});

gulp.task('templates', function() {
  return gulp.src(path.join('templates', '*.+(js|css|html)'))
    .pipe(gulp.dest(path.join('build', 'templates')));
});

function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

gulp.task('renderBook', ['pages', 'templates'], function() {
  var folders = getFolders(path.join('.', 'build', 'manuscript'));

  folders.map(function(folder) {
    renderPage(folder);
  });
});

function renderPage(page) {
  var
    bodyPath = path.join('.', 'build', 'manuscript', page, "body.html"),
    headPath = path.join('.', 'build', 'manuscript', page, "head.html"),
    scriptPath = path.join('.', 'build', 'manuscript', page, "script.js"),
    stylePath = path.join('.', 'build', 'manuscript', page, "style.css"),
    templateStylePath = path.join('.', 'templates', "template.css");
  templateHeadPath = path.join('.', 'templates', "head.html");

  var
    bodyContent = '',
    styleContent = '',
    templateStyleContent = '',
    scriptContent = '',
    headContent = '',
    templateHeadContent = '';

  if (fs.existsSync(bodyPath)) {
    bodyContent = fs.readFileSync(bodyPath, 'utf-8').toString();
  }
  if (fs.existsSync(stylePath)) {
    styleContent = fs.readFileSync(stylePath, 'utf-8').toString();
  }
  if (fs.existsSync(templateStylePath)) {
    templateStyleContent = fs.readFileSync(templateStylePath, 'utf-8').toString();
  }
  if (fs.existsSync(headPath)) {
    headContent = fs.readFileSync(headPath, 'utf-8').toString();
  }
  if (fs.existsSync(templateHeadPath)) {
    templateHeadContent = fs.readFileSync(templateHeadPath, 'utf-8').toString();
  }
  if (fs.existsSync(scriptPath)) {
    scriptContent = fs.readFileSync(scriptPath, 'utf-8').toString();
  }

  var templateData = {
    bodyContent: bodyContent,
    templateStyleContent: templateStyleContent,
    styleContent: styleContent,
    headContent: headContent,
    templateHeadContent: templateHeadContent,
    scriptContent: scriptContent
  };

  gulp.src(path.join('.', 'crust', 'page-template.html'))
    .pipe(handlebars(templateData, {}))
    .pipe(concat(page + '.html'))
    .pipe(gulp.dest(path.join('.', 'build', 'renders')))
    .pipe(browserSync.stream());

}


gulp.task('indexPage', function() {

  var book = require(path.join(__dirname, 'crust', 'plugins', 'length.js'));
  var bookLength = book.length();
  var contentString = '';

  for (var index = 1; index <= bookLength; index++) {

    contentString += "<div class='page'>" +
      "<iframe src='/build/renders/page-" + index + ".html'>" +
      "</iframe></div>";

  }

  var packageJson = JSON.parse(fs.readFileSync('package.json').toString());
  var bookname = packageJson.name;

  var templateData = {
    CONTENT: contentString,
    BOOKNAME: bookname
  };

  gulp.src(path.join('.', 'crust', 'index-template.html'))
    .pipe(handlebars(templateData, {}))
    .pipe(concat('index.html'))
    .pipe(gulp.dest('.'))
    .pipe(browserSync.stream());

});

gulp.task('default', ['renderBook', 'indexPage', 'watchBook']);