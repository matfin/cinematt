'use strict';

if(window.cinematt == null) {
	window.cinematt = {};
}

onload = () => {
	const utils = window.cinematt.utils;
	utils.makeBars('a.photo-card figure, picture.photo');
	utils.lazyLoadImages('a.photo-card img, picture.photo source');
	document.addEventListener('scroll', utils.throttle(utils.lazyLoadImages.bind(null, 'a.photo-card img, picture.photo source')));
	utils.primeTapEvent('button', utils.toggleMenuReveal);
};