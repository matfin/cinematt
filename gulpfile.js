'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');

const dest = {
	scripts: process.env['SCRIPTS_DEST'],
	svg: process.env['SVG_DEST'],
	favicons:	process.env['FAVICONS_DEST'],
	watch: process.env['WATCH'] != null
};

const tasks = () => {
	const items = [
		'debug',
		'scripts',
		'svg',
		'favicons'
	];

	if(dest.watch) {
		items.push('watch')
	}

	return items;
};

gulp.task('debug', () => {
	console.log({
		destinations: dest
	});
});

gulp.task('scripts', () => {
	return gulp
	.src('./assets/scripts/**/*')
	.pipe(concat('main.js'))
	.pipe(gulp.dest(dest.scripts));
});

gulp.task('favicons', () => {
	return gulp
	.src('./assets/favicons/**/*')
	.pipe(gulp.dest(dest.favicons));
});

gulp.task('svg', () => {
	return gulp
	.src('./assets/svg/**/*')
	.pipe(gulp.dest(dest.svg));
});

gulp.task('watch', () => {
	gulp.watch('./assets/scripts/**/*', ['scripts']);
	gulp.watch('./assets/svg/**/*', ['svg']);
	gulp.watch('./assets/favicons/**/*', ['favicons']);
});

gulp.task('default', tasks());

