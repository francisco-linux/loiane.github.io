'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import imagemin from 'gulp-imagemin';
import changed from 'gulp-changed';
import filelog from 'gulp-filelog';
import plumber from 'gulp-plumber';
import util from 'gulp-util';
import header from 'gulp-header';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import swPrecache from 'sw-precache';
import hygienist from 'hygienist-middleware';
import child from 'child_process';
const $ = gulpLoadPlugins();
const siteRoot = '_site';

browserSync.create();

// Delete the _site directory.
gulp.task('cleanup-build', () => {
  return gulp.src('_site', {read: false})
      .pipe($.clean());
});

// Optimize images.
gulp.task('minify-images', () => {
  const imgDst = 'assets/images/2017';
  const imgSrc = 'src/images/2017/*';
  gulp.src([
    //'src/images/**/*'
    imgSrc
  ])
    .pipe(plumber())
    .pipe(filelog())
    //.pipe(changed(imgSrc))
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(filelog('Optimized'))
    .pipe(gulp.dest(imgDst));
});

// Concatenate, transpiles ES2015 code to ES5 and minify JavaScript.
const banner = (
  `/*! loiane.com | Loiane Groner (c) ${new Date().getFullYear()} */\n`
);
gulp.task('scripts', () => {
  gulp.src([
    './src/scripts/sw-registration.js',
    './src/scripts/main.js'
  ])
    .pipe($.concat('main.min.js'))
    .pipe($.babel())
    .pipe($.uglify())
    .pipe(header(banner))
    .pipe(gulp.dest('_includes/assets'));
});

// Compile scss to css.
// Minify and add prefix to css.
gulp.task('scss', () => {
    const AUTOPREFIXER_BROWSERS = [
      'ie >= 10',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 23',
      'ios >= 7',
      'android >= 4.4',
      'bb >= 10'
    ];
    return gulp.src(['src/scss/main.scss'])
        .pipe($.sass({
            includePaths: ['css'],
            onError: browserSync.notify
        }))
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe($.cssnano())
        .pipe(header(banner))
        .pipe(gulp.dest('_includes/assets'));
});

const jekyllLogger = buffer => {
  buffer.toString().split(/\n/).forEach((message) => util.log(`Jekyll: ${message}`));
};
gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['serve', '--watch', '--incremental', '--drafts']);
  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

// Watch change in files.
gulp.task('serve', () => {
  browserSync.init({
    notify: false,
    port: 3000,
    server: {
      baseDir: siteRoot,
      middleware: hygienist(siteRoot)
    }
    // https: true,
  });
});

gulp.task('watch', () => {
  // Watch scss changes.
  gulp.watch('src/scss/**/*.scss', ['scss']);

  // Watch JavaScript changes.
  gulp.watch('src/scripts/**/*.js', ['scripts']);

  // Watch image changes.
  //gulp.watch('src/images/**/*', ['minify-images']);
});

gulp.task('generate-service-worker', (callback) => {
  var path = require('path');
  var rootDir = '_site';
  var blogDir = '';

  swPrecache.write(path.join(blogDir, 'sw.js'), {
    staticFileGlobs: [
      rootDir + '/',
      rootDir + '/*.html',
      rootDir + '/*.json',
      rootDir + '/*.webapp',
      rootDir + '/assets/**/*.{js,css}',
      rootDir + '/assets/fonts/*.{woff,woff2}',
      rootDir + '/assets/images/*.jpg',
      rootDir + '/assets/images/tags/*.svg',
      rootDir + '/assets/images/icons/*.png',
      rootDir + '/assets/images/2017/*.{png,jpg,gif,svg}'
      //rootDir + '/**/*.{js,html,css,png,jpg,gif,json,svg}'
    ],
    stripPrefix: rootDir,
    replacePrefix: ''
  }, callback);
});

// ***************** CI build *****************

// Minify the HTML.
gulp.task('minify-html', () => {
  return gulp.src('_site/**/*.html')
    .pipe($.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
    }))
    .pipe(gulp.dest('_site'));
});

  /*gulp.task('fix-config', () => {
    gulp.src('_config.yml')
      .pipe($.replace('baseurl: ""', 'baseurl: "loiane.com"'))
      .pipe($.clean())
      .pipe(gulp.dest('.'));
  });

  gulp.task('revert-config', () => {
    gulp.src('_config.yml')
        .pipe($.replace('baseurl: "loiane.com"', 'baseurl: ""'))
        .pipe($.clean())
        .pipe(gulp.dest('.'));
  });*/

//gulp.task('jekyll-build', ['scss', 'scripts', 'jekyll']/*, $.shell.task(['jekyll build'])*/);

//gulp.task('jekyll-build-for-deploy', $.shell.task(['jekyll build']));

// Default task.
/*gulp.task('build', () =>
  runSequence(
    //'fix-config',
    'cleanup-build',
    'scss',
    'scripts',
    'jekyll-build-for-deploy',
    'minify-html',
    'generate-service-worker',
   // 'minify-images'//,
    //'revert-config'
  )
);*/

// Depoly website to gh-pages.
gulp.task('gh-pages', () => {
  return gulp.src('./_site/**/*')
    .pipe($.ghPages());
});

gulp.task('deploy', () => {
  runSequence(
    'cleanup-build',
    'scss',
    'scripts',
    'jekyll-build-for-deploy',
    'minify-html',
    'generate-service-worker',
    'minify-images',
    'gh-pages',
    'revert-config'
  )
});

gulp.task('dev', ['scss', 'scripts', 'jekyll', 'watch', 'serve', 'generate-service-worker']);
