// Adiciona os modulos instalados

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

// Função para compilar o Sass e autoprefix
function compilaSass(){
    return gulp
    .src('scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
}

// Tarefa para executar a função acima no gulp
gulp.task('sass', compilaSass);

// function LiveServer - Browsersync

function browser(){
    browserSync.init({
        server:{
            baseDir: "./"
        }
    });
}

// Tarefa para funcionar o browser Sync - liveserver

gulp.task('browser-sync', browser);

// gulp watch do Gulp - Que verifica qualquer alteração no arquivo

function watch(){
    gulp.watch('scss/*.scss', compilaSass);
    gulp.watch('*.html').on('change', browserSync.reload);
}


// Tarefa para iniciar a função do Watch

gulp.task('watch', watch);


// Tarefa padrão do Gulp que é executada apenas com Gulp no terminal

gulp.task('default', gulp.parallel('watch', 'browser-sync'));