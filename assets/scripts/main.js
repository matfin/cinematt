'use strict';

if(window.cinematt == null) {
	window.cinematt = {};
}

onload = () => {
	const utils = window.cinematt.utils;
	utils.makeBars();
	utils.loadThumbnails();
	document.addEventListener('scroll', utils.throttle(utils.loadThumbnails));	
};