'use strict';

if(window.cinematt == null) {
	window.cinematt = {};
}

window.cinematt.utils = {

	throttle: (fn, limit = 200) => {
		let waiting = false;
		
		return () => {
			if(!waiting) {
				fn.call();
				waiting = true;
				setTimeout(() => {
					waiting = false;
				}, limit);
			}
		};
	},

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
		images.filter(image => {
			return cinematt.utils.inView(image) && !cinematt.utils.hasLoaded(image);
		}).forEach(cinematt.utils.primeImage);
	},

	inView: (node) => {
		const {
			top,
			right,
			bottom,
			left,
			width,
			height
		} = node.getBoundingClientRect();

		return top <= window.innerHeight;
	},

	hasLoaded: (node) => {
		return node.getAttribute('src') != null;
	},

	imageLoaded: (evt) => {
		let image 	= evt.target, 
			figure 	= image.parentNode;
		figure.removeAttribute('data-colours');
		figure.style.backgroundImage = 'none';
		figure.classList.add('loaded');
	}

};