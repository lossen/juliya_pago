/*global require*/

var WORK_OUT_FOLDER = '../public_html/assets/',
    PROD = false;

var gulp        = require('gulp'),
    plumber     = require('gulp-plumber'),
    size        = require('gulp-filesize'),

    spritesmith = require('gulp.spritesmith'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
	buffer      = require('vinyl-buffer'),
    merge       = require('merge-stream'),

    stylus      = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS   = require('gulp-minify-css'),

    babel       = require('gulp-babel'),
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    uglify      = require('gulp-uglify'),
    bootstrap = require('bootstrap-styl'),
    svgSprite = require('gulp-svg-sprite'),
    //svgSprite = require("gulp-svg-sprites"),
    nib = require('nib');

gulp.task('js', function () {
    "use strict";

    return gulp.src(['js/**/*.js'])
        .pipe(plumber())
        .pipe(babel())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(WORK_OUT_FOLDER + 'js/'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(WORK_OUT_FOLDER + 'js'))
        .pipe(size());
});


gulp.task('vendors', function () {
    "use strict";

    gulp.src([
        './vendor/fullpage.js/dist/jquery.fullpage.min.css',
        './vendor/nprogress/nprogress.css',
        './vendor/lightgallery/dist/css/lightgallery.min.css'
    ])
    .pipe(concat('vendors.css'))
    // .pipe(rename('vendors.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(WORK_OUT_FOLDER + 'css'));

    var vendors_js = [
            './vendor/jquery/dist/jquery.min.js',
            './vendor/fullpage.js/dist/jquery.fullpage.min.js',
            './vendor/jPlayer/dist/jplayer/jquery.jplayer.min.js',
            './vendor/jPlayer/dist/add-on/jplayer.playlist.min.js',
            './vendor/nprogress/nprogress.js',
            './vendor/masonry/dist/masonry.pkgd.min.js',
            './vendor/lightgallery/dist/js/lightgallery-all.min.js'


    ];

    gulp.src(vendors_js)
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest(WORK_OUT_FOLDER + 'js'))
        .pipe(rename('vendors.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(WORK_OUT_FOLDER + 'js'));

});


gulp.task('sprite', function () {
    "use strict";

    var spriteData = gulp.src('img/*.png')
        .pipe(plumber())
        .pipe(spritesmith({
            padding: 20,
            imgName: '../img/sprite.png',
            cssName: 'sprite.styl'
        }));

    var imgStream = spriteData.img
        .pipe(buffer())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(WORK_OUT_FOLDER + 'img/'));


    var cssStream = spriteData.css
        .pipe(gulp.dest('styl/'));

    return merge(imgStream, cssStream);

});

gulp.task('svg_sprites', function () {
   var config                  = {
        mode                : {
            css             : {     // Activate the «css» mode
                render      : {
                    css     : true  // Activate CSS output (with default options)
                }
            },
            symbol          : true
        }
    };

    return gulp
        .src('svg/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest(WORK_OUT_FOLDER));
});

gulp.task('stylus-to-css', function () {
    "use strict";

    var stream = gulp.src('styl/app.styl')
        .pipe(plumber())
        .pipe(stylus({
            use: [bootstrap(), nib()],
            'include css': true
        }))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(WORK_OUT_FOLDER + 'css'))
        .pipe(rename({suffix: ".min"}))
        .pipe(minifyCSS())
        .pipe(gulp.dest(WORK_OUT_FOLDER + 'css'));
});



gulp.task('watch', function () {
    "use strict";

    gulp.watch('styl/**/*.styl', ['stylus-to-css']);
    gulp.watch('js/**/*.js', ['js']);


});

gulp.task('default', ['watch']);