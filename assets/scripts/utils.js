'use strict';

if(window.cinematt == null) {
	window.cinematt = {};
}

window.cinematt.utils = {

	addGradients: (photo_card) => {
		let colours = photo_card.getAttribute('data-colours').split(','),
			step = 100 / colours.length;

		let gradient = colours.map((colour, index) => `${colour} ${index * step}%, ${colour} ${++index * step}%`).join(',');
		photo_card.style.backgroundImage = `linear-gradient(to right, ${gradient})`;
	},

	makeBars: () => {
		let cards = [...document.querySelectorAll('figure.photo-card')];
		cards.forEach(window.cinematt.utils.addGradients);
	},

	primeImage: (img) => {
		let src 	= img.getAttribute('data-src'),
			srcset	= img.getAttribute('data-srcset');

		img.removeAttribute('data-src');
		img.removeAttribute('data-srcset');
		img.setAttribute('src', src);
		img.setAttribute('srcset', srcset);
		img.addEventListener('load', cinematt.utils.imageLoaded);
	},

	loadThumbnails: () => {
		let images = [...document.querySelectorAll('figure img')];
		images.forEach(cinematt.utils.primeImage);
	},

	imageLoaded: (evt) => {
		let figure = evt.target.parentNode;
		figure.removeAttribute('data-colours');
		figure.style.backgroundImage = 'none';
		figure.classList.add('loaded');
	}

};