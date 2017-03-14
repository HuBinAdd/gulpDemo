const gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'), //html压缩
    imagemin = require('gulp-imagemin'), //图片压缩
    jshint = require('gulp-jshint'), //js检测
    uglify = require('gulp-uglify'), //js压缩
    concat = require('gulp-concat'), //文件合并
    rename = require('gulp-rename'), //文件更名
    notify = require('gulp-notify'), //提示信息
    sass = require('gulp-sass'), //sass
    cssmin = require('gulp-minify-css'),
    spritesmith = require('gulp.spritesmith'),
    cssver = require('gulp-make-css-url-version'),
    postcss = require('gulp-postcss'),
    reporter = require('postcss-reporter'),
    autoprefixer = require('autoprefixer'),
    cssgrace = require('cssgrace'),
    cssnext = require('cssnext'),
    htmlrev = require('gulp-rev-append'),
    stylelint = require('stylelint'),
    gutil = require("gulp-util"),
    webpack = require("webpack"),
    pngquant = require('imagemin-pngquant'), //深度压缩png图片
    clean = require('gulp-clean'); //清空文件夹
    connect = require('gulp-connect'), //web服务
    browserSync = require('browser-sync'), //浏览器同步
    reload = browserSync.reload, //自动刷新
    filter = require('gulp-filter'),
    webpackConfig = require("./webpack.config.js"),
    fileinclude = require('gulp-file-include');

var projects = '项目/投保专题页/pc/',
    date = new Date(),
    isPc = /\/pc\/$/g.test(projects);//判断是否为PC

date = date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate();

var config = {
    webserver: projects + 'dist',
    copy: {
        dirname: '项目/**',
        dist: '项目 - 备份/' + date
    },
    newProjects: {
        dirname: (function(){
            var url ='项目模板/pc/**';
            if(!isPc){
                url ='项目模板/wap/**';
            }
            return url;
        })(),
        dist: projects
    },
    html: {
        dirname: projects + 'item/*.html',
        dist: projects + 'dist'
    },
    htmlrev: {
        dirname: projects + 'dist/*.html',
        dist: projects + 'dist'
    },
    spritesmith: {
        dirname: projects + 'item/images/icon-*.*',
        dist: projects + 'item'
    },
    img: {
        dirname: [projects + 'item/images/*.*', '!' + projects + 'item/images/icon-*.*'],
        dist: projects + 'dist/images'
    },
    font: {
        dirname: projects + 'item/fonts/*.*',
        dist: projects + 'dist/fonts'
    },
    cssLint: {
        dirname: projects + 'item/css/*.css'
    },
    cssHack: {
        dirname: projects + 'dist/css/*.css',
        dist: projects + 'dist/css'
    },
    css: {
        dirname: projects + 'item/css/*.css',
        dist: projects + 'dist/css'
    },
    jsLint: {
        dirname: projects + 'dist/js/*.js'
    },
    js: {
        dirname: projects + 'item/js/*.js',
        dist: projects + 'dist/js'
    }
};

// 压缩html
gulp.task('html', function() {

    var options = {
        removeComments: false, //清除HTML注释
        //collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        //removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        //removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        //minifyJS: true, //压缩页面JS
        // minifyCSS: true //压缩页面CSS
    };

    return gulp.src(config.html.dirname)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(htmlmin(options))
        .pipe(gulp.dest(config.html.dist))
        .pipe(connect.reload());
    //.pipe(notify({ message: 'html task ok' })); 
});

gulp.task('htmlrev', function() {
    gulp.src(config.htmlrev.dirname)
        .pipe(htmlrev())
        .pipe(gulp.dest(config.htmlrev.dist));
});

//拼接雪碧图
gulp.task('spritesmith', function() {
    if (isPc) {
        gulp.src(config.spritesmith.dirname)
            .pipe(spritesmith({
                // cssFormat: 'scss',
                // cssTemplate: 'handlebarsStr.sass.handlebars',   
                // algorithm: 'top-down', // 图标的排序方式       
                cssTemplate: 'handlebarsStr.css.handlebars',
                cssOpts: 'iconfont',
                imgName: 'images/icons.png', // 生成的图片
                cssName: 'css/icons.css', // 生成的sass文件
                padding: 5, // 图标之间的距离
                cssVarMap: function(item) {
                    var name = "",
                        jilu = "";

                    item.name = item.name.replace(/\((.+)\)/g, function($1, $2, $3) {
                        jilu = $2;
                        return '';
                    });

                    if (jilu) {
                        jilu = jilu.replace(/~/g, ':');
                        item.name = jilu + " ." + item.name;
                    } else {
                        item.name = " ." + item.name;
                    }

                    if (item.name.indexOf('-hover') !== -1) {
                        name = item.name.replace('-hover', ':hover');
                        // Otherwise, use the name as the selector (e.g. 'home' -> 'home')
                    } else {
                        name = item.name;
                    }
                    item.name = name;
                }
            }))
            .pipe(gulp.dest(config.spritesmith.dist));
    } else {
        gulp.src(config.spritesmith.dirname)
            .pipe(spritesmith({
                cssFormat: 'scss',
                cssTemplate: 'handlebarsStr.sass.handlebars',
                algorithm: 'top-down', // 图标的排序方式       
                //cssTemplate: 'handlebarsStr.css.handlebars',
                cssOpts: 'iconfont',
                imgName: 'images/icons.png', // 生成的图片
                cssName: 'css/icons.css', // 生成的sass文件
                padding: 5, // 图标之间的距离
                cssVarMap: function(item) {
                    var name = "",
                        jilu = "";

                    item.name = item.name.replace(/\((.+)\)/g, function($1, $2, $3) {
                        jilu = $2;
                        return '';
                    });

                    if (jilu) {
                        jilu = jilu.replace(/~/g, ':');
                        item.name = jilu + " ." + item.name;
                    } else {
                        item.name = " ." + item.name;
                    }

                    if (item.name.indexOf('-hover') !== -1) {
                        name = item.name.replace('-hover', ':hover');
                        // Otherwise, use the name as the selector (e.g. 'home' -> 'home')
                    } else {
                        name = item.name;
                    }
                    item.name = name;
                }
            }))
            .pipe(gulp.dest(config.spritesmith.dist));
    }
});

// 压缩图片
gulp.task('img', function() {
    return gulp.src(config.img.dirname)
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
            use: [pngquant()] //深度处理png格式的图片
        })) //压缩图片
        // 如果想对变动过的文件进行压缩，则使用下面一句代码
        // .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))) 
        .pipe(gulp.dest(config.img.dist))
        .pipe(connect.reload());
    //.pipe(notify({ message: 'img task ok' }));
});

// 
gulp.task('font', function() {
    return gulp.src(config.font.dirname)
        .pipe(gulp.dest(config.font.dist))
        .pipe(connect.reload());
});

//CSS审查********
gulp.task("css-lint", function() {

    // Stylelint config rules
    var stylelintConfig = {
        "rules": {
            // "block-no-empty": true,
            // "color-no-invalid-hex": true,
            // "declaration-colon-space-after": "always",
            // "declaration-colon-space-before": "never",
            // "function-comma-space-after": "always",//always-single-line
            // "media-feature-colon-space-after": "always",
            // "media-feature-colon-space-before": "never",
            // "max-empty-lines": 5,
            // "number-leading-zero": "never",//always
            // "number-no-trailing-zeros": true,
            // "selector-list-comma-space-before": "never",
            // "selector-list-comma-newline-after": "always"
        }
    };
    var processors = [
        stylelint(stylelintConfig),
        // Pretty reporting config
        reporter({
            clearMessages: true,
            throwError: true
        })
    ];

    return gulp.src(config.cssLint.dirname)
        .pipe(postcss(processors));
});

//自动添加除css3 hack
gulp.task('css-hack', function() {
    var processors = [
        autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true,
            remove: true
        }),
        cssnext(),
        cssgrace
    ];
    return gulp.src(config.cssHack.dirname)
        .pipe(postcss(processors))
        .pipe(gulp.dest(config.cssHack.dist));
});

// 为CSS中的图片添加MD5标识 合并、压缩、重命名css
gulp.task('css', function() {
    var processors = [];
    if(isPc){
        processors = [
            autoprefixer({
                browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'Android >= 4.0'],
                cascade: true,
                remove: true
            }),
            cssnext()
        ];
    }else{
        processors = [
            autoprefixer({
                browsers: ['last 2 version', /*'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6',*/ 'Android >= 4.0'],
                cascade: true,
                remove: true
            }),
            cssnext()
        ];
    }
    return gulp.src(config.css.dirname)
        .pipe(sass())
        .pipe(cssver()) //给css文件里引用文件加版本号（文件MD5）
        .pipe(concat('main.css')) //css合并
        .pipe(postcss(processors))
        // .pipe(gulp.dest(config.css.dist))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssmin({
            advanced: false, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: false, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*' //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest(config.css.dist))
        .pipe(connect.reload());
    //.pipe(notify({ message: 'css task ok' }));
});

// 检查js
gulp.task('js-lint', function() {
    return gulp.src(config.jsLint.dirname)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
    //.pipe(notify({ message: 'lint task ok' }));
});

// 合并、压缩js文件
gulp.task('js', function() {
    gulp.src(config.js.dirname)
        //.pipe(concat('all.js'))
        .pipe(gulp.dest(config.js.dist))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(config.js.dist))
        //.pipe(reload({stream: true}))//browser-sync刷新方法
        .pipe(connect.reload());
    //.pipe(notify({ message: 'js task ok' }));
});

//webpack
gulp.task("webpack", function(callback) {
    var myConfig = Object.create(webpackConfig);
    //var myConfig = getWebpackConfig();
    // run webpack
    webpack(
        // configuration
        myConfig,
        function(err, stats) {
            // if(err) throw new gutil.PluginError("webpack", err);
            // gutil.log("[webpack]", stats.toString({
            //   // output options
            // }));
            callback();
        });
});


//6.清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(config.html.dist, { read: false })
        .pipe(clean());
    //.pipe(notify({message: 'Clean task complete'}));
});

//7.备份文件
gulp.task('copy', function() {
    return gulp.src(config.copy.dirname)
        .pipe(gulp.dest(config.copy.dist));
});
//7.创建
gulp.task('new', function() {
    return gulp.src(config.newProjects.dirname)
        .pipe(gulp.dest(config.newProjects.dist));
});
/**
 * 建立任务
 * */
// 定义web服务模块
gulp.task('webserver', function() {
    connect.server({
        root: config.webserver,
        livereload: true,
        port: 8081
    });
});

// 定义web服务模块，增加浏览器同步浏览
// gulp.task('browser-sync', function() {
//    browserSync({
//        server: {
//            baseDir: '.'
//        },
//        directory:true,
//        port: 8081
//    });
// });

// 默认任务
gulp.task('default', function() {
    gulp.start('spritesmith', 'html', 'font', 'img', 'css', 'js', 'js-lint', 'webserver');

    //监听html文件变化
    gulp.watch(config.html.dirname, function() {
        gulp.run('html');
    });

    // Watch .css files
    gulp.watch(config.css.dirname, function() {
        gulp.run('css');
    });


    // Watch .js files
    gulp.watch(config.js.dirname, function() {
        gulp.run('js');
    });

    // Watch image files
    gulp.watch(config.img.dirname, function() {
        gulp.run('img');
    });

    // Watch image files
    gulp.watch(config.font.dirname, function() {
        gulp.run('font');
    });

    gulp.watch(config.spritesmith.dirname, function() {
        gulp.run('spritesmith');
    });

});
