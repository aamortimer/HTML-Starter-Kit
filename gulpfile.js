var gulp = require('gulp')
    gutil = require('gulp-util')
    es = require('event-stream');

var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

var changeEvent = function(evt) {
    gutil.log('File', gutil.colors.cyan(evt.path), 'was', gutil.colors.magenta(evt.type));
};

var paths = {
  scss: {
    path: 'assets/sass/',
    src: 'assets/sass/**/*.scss',
    dest: 'assets/css/'
  },
  less: {
    path: 'assets/less/',
    src: 'assets/less/**/*.less',
    dest: 'assets/css/'
  },
  scripts: {
    src: 'assets/js/**/*.js',
    dest: 'assets/js/'
  },
  sprite: {
    src: 'assets/imgs/sprites/*',
    dest: 'assets/imgs/'
  }
}

gulp.task('scss', function(){
  var sassFiles = gulp.src(paths.scss.src)
      .pipe(plugins.rubySass({
        style: 'compressed', sourcemap: false, precision: 2
      }))
      .on('error', function(err){
        new gutil.PluginError('CSS', err, {showStack: true});
      });

    return es.concat(gulp.src(''), sassFiles)
        .pipe(plugins.concat('style.min.css'))
        .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(plugins.combineMediaQueries({log: true}))
        .pipe(plugins.cssmin())
        .pipe(plugins.size())
        .pipe(gulp.dest(paths.scss.dest));
});

gulp.task('less', function(){
  var lessFiles = gulp.src(paths.less.src)
      .pipe(plugins.less({
        compress: true
      }))
      .on('error', function(err){
        new gutil.PluginError('CSS', err, {showStack: true});
      });

    return es.concat(gulp.src(''), lessFiles)
        .pipe(plugins.concat('style.min.css'))
        .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(plugins.combineMediaQueries({log: true}))
        .pipe(plugins.cssmin())
        .pipe(plugins.size())
        .pipe(gulp.dest(paths.less.dest));
});

gulp.task('scripts', function(){
  gulp.src(paths.scripts.src)
    .pipe(plugins.concat('app.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(plugins.uglify())
    .pipe(plugins.size())
    .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src(paths.sprite.src).pipe(plugins.spritesmith({
      imgName: 'sprite.png',
      cssName: '_sprite.scss',
      imgPath: paths.sprite.dest + 'sprite.png'
  }));
  spriteData.img.pipe(gulp.dest(paths.sprite.dest));
  spriteData.css.pipe(gulp.dest(paths.scss.path));
});

gulp.task('sprite_less', function () {
  var spriteData = gulp.src(paths.sprite.src).pipe(plugins.spritesmith({
      imgName: 'sprite.png',
      cssName: '_sprite.less',
      imgPath: paths.sprite.dest + 'sprite.png'
  }));
  spriteData.img.pipe(gulp.dest(paths.sprite.dest));
  spriteData.css.pipe(gulp.dest(paths.scss.path));
});

gulp.task('watch', ['sprite', 'scss', 'scripts'], function(){
  gulp.watch(paths.scss.src, ['scss']).on('change', function(evt) {
    changeEvent(evt);
  });
  gulp.watch(paths.scripts.src, ['scripts']).on('change', function(evt) {
    changeEvent(evt);
  });
});


gulp.task('default', ['scss', 'scripts', 'watch']);
