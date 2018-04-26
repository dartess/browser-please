const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const babelConfig = {
    presets: ['env'],
    plugins: ['transform-es2015-modules-umd'],
    compact: false,
};

gulp.task(
    'library',
    () => gulp.src('src/parseBrowser.js')
        .pipe(babel(babelConfig))
        .pipe(gulp.dest('build/'))
        .pipe(uglify())
        .pipe(rename('parseBrowser.min.js'))
        .pipe(gulp.dest('build/')),
);

gulp.task(
    'gh-pages-common',
    () => gulp.src([
        'src/gh-pages.js',
        'src/parseBrowser.js',
        'test/testData.js',
    ])
        .pipe(babel(babelConfig))
        .pipe(uglify())
        .pipe(gulp.dest('gh-pages/')),
);

gulp.task('build', gulp.series('library', 'gh-pages-common', done => done()));

gulp.task('default', gulp.series('build', done => done()));
