'use strict';

if(window.cinematt == null) {
	window.cinematt = {};
}

onload = () => {
	const utils = window.cinematt.utils;
	
	[...document.querySelectorAll('figure')].forEach(utils.primeCaptionContrast);
	
	utils.makeBars('figure');
	utils.lazyLoadImages('img, source');
	
	document.addEventListener('scroll', utils.throttle(utils.lazyLoadImages.bind(null, 'img, source')));
	
	utils.primeTapEvent('button', utils.toggleMenuReveal);
};