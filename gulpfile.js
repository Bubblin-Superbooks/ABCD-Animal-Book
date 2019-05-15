(((r) => {
  // *************************************//
  // *********** DEPENDENCIES ************//
  // *************************************//

  const gulp = r('gulp')
  const fse = r('fs-extra')
  const fs = r('fs')
  const path = r('path')
  const browserSync = r('browser-sync')
  const handlebars = r('gulp-compile-handlebars')
  const concat = r('gulp-concat')
  const gulpif = r('gulp-if')
  const book = r('book-length')
  const del = r('del')
  const delayed = r('delayed')

  // Preprocessors / Transpilers
  const haml = r('gulp-haml')
  const markdown = r('gulp-markdown')
  const sass = r('gulp-sass')
  const less = r('gulp-less')
  const stylus = r('gulp-stylus')
  // const postcss = r('gulp-postcss')

  // *************************************//
  // ************ Build BUILD ************//
  // *************************************//

  function getFolders (dir) {
    return fs.readdirSync(dir)
      .filter(file => fs.statSync(path.join(dir, file)).isDirectory())
  }

  gulp.task('pages', (done) => {
    return gulp.src(path.join('manuscript', '*', '*'))
      .pipe(gulpif(/[.]haml$/, haml()))
      .pipe(gulpif(/[.]md$/, markdown()))
      .pipe(gulpif(/[.]markdown$/, markdown()))
      .pipe(gulpif(/[.]scss|sass$/, sass()))
      .pipe(gulpif(/[.]less$/, less()))
      .pipe(gulpif(/[.]styl$/, stylus()))
      .pipe(gulp.dest(path.join('build', 'manuscript')))

    done()
  })

  gulp.task('templates', (done) => {
    return gulp.src(path.join('templates', '*.*'))
      .pipe(gulpif(/[.]haml$/, haml()))
      .pipe(gulpif(/[.]md$/, markdown()))
      .pipe(gulpif(/[.]markdown$/, markdown()))
      .pipe(gulpif(/[.]scss|sass$/, sass()))
      .pipe(gulpif(/[.]less$/, less()))
      .pipe(gulpif(/[.]styl$/, stylus()))
      .pipe(gulp.dest(path.join('build', 'templates')))
    done()
  })

  gulp.task('renderBook', gulp.series('pages', 'templates', (done) => {
    const folders = getFolders(path.join('.', 'build', 'manuscript'))
    folders.map(folder => { renderPage(folder) })

    done()
  }))

  // *************************************//
  // ************ Book Indexer ***********//
  // *************************************//

  gulp.task('indexPage', (done) => {
    indexPageHandler()

    done()
  })

  function indexPageHandler () {
    const bookLength = book.length()

    // let contentString = ''

    // for (let index = 1; index <= bookLength; index++) {
    //   contentString += `<div class='page'><iframe src='build/renders/page-${index}.html'></iframe></div>`
    // }

    fse.readJson(path.join('.', '.bookrc')).then((json) => {
      return {
        BOOKNAME: json.name,
        BOOKLENGTH: bookLength
      }
    }).then((templateData) => {
      gulp.src(path.join('.', 'crust', 'index-template.html'))
        .pipe(handlebars(templateData, {}))
        .pipe(concat('index.html'))
        .pipe(gulp.dest('.'))
        .pipe(browserSync.stream())
    }).catch((err) => {
      console.log('Something went wrong', err)
    })
  }

  // *************************************//
  // ************ Page Renderer **********//
  // *************************************//

  function renderPage (page) {
    const bodyPath = path.join('.', 'build', 'manuscript', page, 'body.html')
    const headPath = path.join('.', 'build', 'manuscript', page, 'head.html')
    const scriptPath = path.join('.', 'build', 'manuscript', page, 'script.js')
    const stylePath = path.join('.', 'build', 'manuscript', page, 'style.css')
    const templateStylePath = path.join('.', 'build', 'templates', 'style.css')
    const templateHeadPath = path.join('.', 'build', 'templates', 'head.html')

    let bodyContent = ''
    let styleContent = ''
    let templateStyleContent = ''
    let scriptContent = ''
    let headContent = ''
    let templateHeadContent = ''

    // TODO: Use promises here?

    if (fs.existsSync(bodyPath)) {
      bodyContent = fs.readFileSync(bodyPath, 'utf-8').toString()
    }
    if (fs.existsSync(stylePath)) {
      styleContent = fs.readFileSync(stylePath, 'utf-8').toString()
    }
    if (fs.existsSync(templateStylePath)) {
      templateStyleContent = fs.readFileSync(templateStylePath, 'utf-8').toString()
    }

    if (fs.existsSync(headPath)) {
      headContent = fs.readFileSync(headPath, 'utf-8').toString()
    }
    if (fs.existsSync(templateHeadPath)) {
      templateHeadContent = fs.readFileSync(templateHeadPath, 'utf-8').toString()
    }
    if (fs.existsSync(scriptPath)) {
      scriptContent = fs.readFileSync(scriptPath, 'utf-8').toString()
    }

    const pageTemplateData = { bodyContent, templateStyleContent, styleContent, headContent, templateHeadContent, scriptContent }

    gulp.src(path.join('.', 'crust', 'page-template.html'))
      .pipe(handlebars(pageTemplateData, {}))
      .pipe(concat(`${page}.html`))
      .pipe(gulp.dest(path.join('.', 'build', 'renders')))
      .pipe(browserSync.stream())
  }

  // Glob pattern matching
  var glob = [path.join('manuscript', '*'),
    path.join('manuscript', '*', '*.+(js|css|html|markdown|md|haml|less|styl|scss|sass)')
  ]

  // *************************************//
  // ************ Page Renderer **********//
  // *************************************//

  gulp.task('watchBook', function () {
    browserSync.init({
      server: './',
      port: 4567,
      notify: false,
      logLevel: 'debug'
    })

    var trashWatcher = gulp.watch(path.join('trash', '*'), gulp.series('indexPage'))

    trashWatcher.on('add', function (pagePath, stats) {
      const paths = pagePath.split(path.sep)
      let page = paths[paths.length - 1] === '' ? paths[paths.length - 2] : paths[paths.length - 1]
      page = `${page.split('-')[0]}-${page.split('-')[1]}`
      del(path.join('build', 'manuscript', page))
      del(path.join('build', 'renders', `${page}.html`))
    })

    gulp.watch(path.join('templates', '**.*'), gulp.series('renderBook'))

    var globWatcher = gulp.watch(glob, gulp.series('renderBook', 'indexPage'))

    globWatcher.on('change', function(pagePath, stats){
      const paths = pagePath.split(path.sep)
      if (paths[paths.length - 1] === '') {
        var page = paths[paths.length - 2]
      } else if (paths[paths.length - 1].split('-')[0] === 'page') {
        page = paths[paths.length - 1]
      } else {
        page = paths[paths.length - 2]
      }      
    });

    globWatcher.on('add', function (pagePath, stats) {
      const paths = pagePath.split(path.sep)
      if (paths[paths.length - 1] === '') {
        var page = paths[paths.length - 2]
      } else if (paths[paths.length - 1].split('-')[0] === 'page') {
        page = paths[paths.length - 1]
      } else {
        page = paths[paths.length - 2]
        pagePath = path.dirname(obj.path)
      }

      del(path.join('build', 'manuscript', page))

      let delay = 1000

      delayed.delay(() => {
        const stats = fs.statSync(pagePath)
        if (stats.isDirectory()) {
          gulp.src(path.join(pagePath, '*'))
            .pipe(gulpif(/[.]haml$/, haml()))
            .pipe(gulpif(/[.]md$/, markdown()))
            .pipe(gulpif(/[.]markdown$/, markdown()))
            .pipe(gulpif(/[.]scss|sass$/, sass()))
            .pipe(gulpif(/[.]less$/, less()))
            .pipe(gulpif(/[.]styl$/, stylus()))
            .pipe(gulp.dest(path.join('build', 'manuscript', page)))
            .on('end', () => {
              renderPage(page)
            })
        }
      }, delay)
    })
  })

  // *************************************//
  // ************ DEFAULT TASK ***********//
  // *************************************//

  gulp.task('default', gulp.series('renderBook', 'indexPage', 'watchBook',
    function (done) {
      done()
    }

  ))
}))(require)
