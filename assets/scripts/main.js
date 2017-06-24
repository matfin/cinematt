'use strict';

if(window.cinematt == null) {
	window.cinematt = {};
}

onload = () => {
	const utils = window.cinematt.utils;
	
	[...document.querySelectorAll('a.prominent figure')].forEach(utils.primeCaptionContrast);
	
	utils.makeBars('picture');
	utils.lazyLoadImages('img, source');
	
	document.addEventListener('scroll', utils.throttle(() => {
		utils.lazyLoadImages('img, source');
	}));
	
	utils.primeTapEvent('button', utils.toggleMenuReveal);
};