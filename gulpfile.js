'use strict';

const	gulp 		= require('gulp'),
		concat 		= require('gulp-concat');

const dest = {
	scripts:	process.env['SCRIPTS_DEST'],
	svgs:		process.env['SVG_DEST'],
	favicons:	process.env['FAVICONS_DEST'],
	watch:		process.env['WATCH'] != null
};

const tasks = () => {
	let items = [
		'debug',
		'scripts',
		'svgs',
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

gulp.task('svgs', () => {
	return gulp
	.src('./assets/svgs/**/*')
	.pipe(gulp.dest(dest.svgs));
});

gulp.task('watch', () => {
	gulp.watch('./assets/scripts/**/*', ['scripts']);
	gulp.watch('./assets/svg/**/*', ['svg']);
	gulp.watch('./assets/favicons/**/*', ['favicons']);
});

gulp.task('default', tasks());

