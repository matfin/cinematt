'use strict';

if(window.cinematt == null) {
	window.cinematt = {};
}

onload = () => {
	const utils = window.cinematt.utils;
	utils.primeCaptionContrast(document.querySelector('.teaser'));
	utils.makeBars('a.photo-card figure, picture.photo, picture.photo-wide');
	utils.lazyLoadImages('a.photo-card img, picture.photo source, picture.photo-wide source');
	document.addEventListener('scroll', utils.throttle(utils.lazyLoadImages.bind(null, 'a.photo-card img')));
	utils.primeTapEvent('button', utils.toggleMenuReveal);
};