import gulp from 'gulp';
import babel from 'gulp-babel';
import gutil from 'gulp-util';
import shell from 'gulp-shell';
import webpack from 'webpack';
import packager from 'electron-packager';

import webpackConfig from './webpack.config.babel';
import pack from './package.json';

gulp.task('electron:babel', () => {
  gulp.src('src/el/**/*.js', { base: 'src' })
  .pipe(babel())
  .pipe(gulp.dest('build/dist'));
});

gulp.task('move:html', () => {
  gulp.src('src/ui/**/*.html', { base: 'src' })
  .pipe(gulp.dest('build/dist'));
});

gulp.task('move:package', () => {
  gulp.src('package.json', { base: './' })
    .pipe(gulp.dest('build/dist'));
});

gulp.task('move:node_modules', () => {
  gulp.src('node_modules/**/*', { base: 'src' })
    .pipe(gulp.dest('build/dist'));
});

gulp.task('run:npm-install', shell.task([
  'npm --prefix ./build/dist install ./build/dist --production',
  './node_modules/.bin/electron-rebuild -m ./build/dist/node_modules',
]));

gulp.task('ui:webpack', (done) => {
  const myConfig = Object.create(webpackConfig);

  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('ui:webpack', err);
    gutil.log('[ui:webpack]', stats.toString({ colors: true }));
    done();
  });
});

const osxBuildOptions = {
  arch: 'x64',
  'app-copyright': '8x8, Inc.',
  'app-version': '1.0.0',
  'build-version': '1.0.0',
  dir: './build/dist',
  name: pack.name,
  out: './build/bundle',
  overwrite: true,
  version: pack.devDependencies.electron,
};

gulp.task('package:osx',
  ['move:package', 'electron:babel', 'ui:webpack', 'move:html', 'run:npm-install'],
(done) => {
  packager(osxBuildOptions, (err, appPath) => {
    if (err) throw new gutil.PluginError('electron-packager', err);
    gutil.log(`[build:osx] App built in: ${appPath}`);
    done();
  });
});

gulp.task('default', ['move:package', 'electron:babel', 'ui:webpack', 'move:html']);
