+!~-(((r, undefined) => {


    const gulp = r('gulp');
    const babel = r('gulp-babel');
    
    // TODO: Transpile all ES6 code to ES5 for browser compatibility.
    
    // gulp.task('transpile', () => {
    //     return gulp.src('src/*.js')
    //         .pipe(babel({ "presets": ["es2015"] }))
    //         .pipe(gulp.dest('build/'));
    // });


    const browserSync = r('browser-sync');
    const handlebars = r('gulp-compile-handlebars');
    const fs = r('fs');
    const path = r('path');
    const del = r('del');
    const delayed = r('delayed');

    // Gulp plugins
    const concat = r('gulp-concat');
    const gulpif = r('gulp-if');

    // HTML preprocessors
    const haml = r('gulp-haml');
    const markdown = r('gulp-markdown');

    // Style preprocessors
    const sass = r('gulp-sass');
    const less = r('gulp-less');
    const stylus = r('gulp-stylus');
    const postcss = r('gulp-postcss');

    // Glob pattern matching
    const glob = [path.join('manuscript', '*'),
        path.join('manuscript', '*', '*.html'),
        path.join('manuscript', '*', '*.css'),
        path.join('manuscript', '*', '*.js')
    ];

    gulp.task('watchBook', () => {
        browserSync.init({
            server: "./",
            port: 4567,
            notify: false,
            host: 'bubblin.com'
        });

        // Watch for deleted directories
        gulp.watch(path.join('trash', '*'), obj => {
            const pagePath = obj.path;
            const paths = pagePath.split(path.sep);
            let page = paths[paths.length - 1] === '' ? paths[paths.length - 2] : paths[paths.length - 1];
            page = `${page.split('-')[0]}-${page.split('-')[1]}`;
            if (obj.type === 'added') {
                del(path.join('build', 'manuscript', page));
                del(path.join('build', 'renders', `${page}.html`));
                gulp.start('indexPage');
            }
        });

        // watch for everything else
        gulp.watch(glob, obj => {
            let page;
            let pagePath = obj.path;
            const paths = pagePath.split(path.sep);
            if (paths[paths.length - 1] === '') {
                page = paths[paths.length - 2];
            } else if (paths[paths.length - 1].split('-')[0] === 'page') {
                page = paths[paths.length - 1];
            } else {
                page = paths[paths.length - 2];
                pagePath = path.dirname(obj.path);
            }
            del(path.join('build', 'manuscript', page));
            if (obj.type === 'added') {
                gulp.start('indexPage');
            }
            /** Hard disk may be deleting files, wait for it to finish
             ** Experimented a bit and 1 sec is right for my system
             ** Slower network shares may need a longer delay
             **/
            delayed.delay(() => {
                const stats = fs.statSync(pagePath);
                if (stats.isDirectory()) {
                    gulp.src(path.join(pagePath, '*'))
                        .pipe(gulpif(/[.]haml$/, haml()))
                        .pipe(gulpif(/[.]md$/, markdown()))

                    .pipe(gulpif(/[.]scss|sass$/, sass()))
                        .pipe(gulpif(/[.]less$/, less()))
                        .pipe(gulpif(/[.]styl$/, stylus()))

                    .pipe(gulp.dest(path.join('build', 'manuscript', page)))
                        .on('end', () => {
                            renderPage(page);
                        });
                }
            }, 1000);
        });

        gulp.watch(path.join('templates', '**.*'), obj => {
            gulp.start('renderBook');
        });

    });

    gulp.task('pages', () => gulp.src(path.join('manuscript', '*', '*'))
        .pipe(gulpif(/[.]haml$/, haml()))
        .pipe(gulpif(/[.]md$/, markdown()))
        .pipe(gulpif(/[.]scss|sass$/, sass()))
        .pipe(gulpif(/[.]less$/, less()))
        .pipe(gulpif(/[.]styl$/, stylus()))
        .pipe(gulp.dest(path.join('build', 'manuscript'))));

    gulp.task('templates', () => gulp.src(path.join('templates', '*.+(js|css|html)'))
        .pipe(gulp.dest(path.join('build', 'templates'))));

    function getFolders(dir) {
        return fs.readdirSync(dir)
            .filter(file => fs.statSync(path.join(dir, file)).isDirectory());
    }

    gulp.task('renderBook', ['pages', 'templates'], () => {
        const folders = getFolders(path.join('.', 'build', 'manuscript'));

        folders.map(folder => {
            renderPage(folder);
        });
    });

    function renderPage(page) {
        const bodyPath = path.join('.', 'build', 'manuscript', page, "body.html"),
            headPath = path.join('.', 'build', 'manuscript', page, "head.html"),
            scriptPath = path.join('.', 'build', 'manuscript', page, "script.js"),
            stylePath = path.join('.', 'build', 'manuscript', page, "style.css"),
            templateStylePath = path.join('.', 'templates', "style.css"),
            templateHeadPath = path.join('.', 'templates', "head.html");

        let bodyContent = '',
            styleContent = '',
            templateStyleContent = '',
            scriptContent = '',
            headContent = '',
            templateHeadContent = '';

        // TODO: fs.existsSync() is deprecated, use fs.statSync() instead

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

        const templateData = {
            bodyContent,
            templateStyleContent,
            styleContent,
            headContent,
            templateHeadContent,
            scriptContent
        };

        gulp.src(path.join('.', 'crust', 'page-template.html'))
            .pipe(handlebars(templateData, {}))
            .pipe(concat(`${page}.html`))
            .pipe(gulp.dest(path.join('.', 'build', 'renders')))
            .pipe(browserSync.stream());

    }


    gulp.task('indexPage', () => {
        const book = r('book-length');

        const bookLength = book.length();

        let contentString = '';

        for (let index = 1; index <= bookLength; index++) {
            contentString += `<div class='page'><iframe src='build/renders/page-${index}.html'></iframe></div>`;
        }

        const packageJson = JSON.parse(fs.readFileSync('package.json').toString());
        const bookname = packageJson.name;

        const templateData = {
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

}))(require);
