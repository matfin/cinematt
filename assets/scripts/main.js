'use strict';

if(window.cinematt == null) {
	window.cinematt = {};
}

onload = () => {
	const utils = window.cinematt.utils;
	utils.makeBars('figure.photo-card, picture.photo');
	utils.lazyLoadImages('figure.photo-card img, picture.photo source');
	utils.primeTapEvent('button', utils.toggleMenuReveal);
	document.addEventListener('scroll', utils.throttle(utils.lazyLoadImages.bind(null, 'figure.photo-card img, picture.photo source')));
};