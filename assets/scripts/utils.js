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

	primeTapEvent: (selector, fn) => {
		const items = document.querySelectorAll(selector);
		items.forEach(item => {
			if('onpointerdown' in window) {
				item.addEventListener('pointerdown', fn);
			}
			else if('ontouchstart' in window) {
				item.addEventListener('touchstart', fn);
			}
			else {
				item.addEventListener('click', fn);
			}
		});
	},

	toggleMenuReveal: () => {
		let header	= document.querySelector('header'),
			body 	= document.querySelector('body'),
			button	= document.querySelector('button');

		if(header.classList.toggle('revealed')) {
			button.classList.add('opened');
			body.classList.add('menu-open');
		}
		else {
			button.classList.remove('opened');
			body.classList.remove('menu-open');
		}
	},

	addGradients: (photo_card) => {
		if(photo_card.getAttribute('data-colours') == null) {
			return
		}

		let colours = photo_card.getAttribute('data-colours').split(','),
			step = 100 / colours.length;

		let gradient = colours.map((colour, index) => {
			return `${colour} ${++index * step}%`
		}).join(',');

		photo_card.style.backgroundImage = `linear-gradient(to right, ${gradient})`;
	},

	makeBars: (selector) => {
		let cards = [...document.querySelectorAll(selector)];
		cards.forEach(window.cinematt.utils.addGradients);
	},

	primeImage: (img) => {

		let src 	= img.getAttribute('data-src'),
			srcset	= img.getAttribute('data-srcset'),
			parent  = img.parentNode;

		img.removeAttribute('data-src');
		img.removeAttribute('data-srcset');

		if(img.tagName === 'SOURCE') {
			let image = parent.querySelector('img');
			img.setAttribute('srcset', srcset);
			image.addEventListener('load', cinematt.utils.imageLoaded);
		}
		else {
			img.setAttribute('src', src);
			img.addEventListener('load', cinematt.utils.imageLoaded);
		}
	},

	inView: (node) => {
		let top 	= node.getBoundingClientRect().top,
			height 	= window.innerHeight;

		return top <= height;
	},

	hasLoaded: (node) => {
		return node.getAttribute('src') != null || node.getAttribute('srcset') != null;
	},

	hexToLuma: (colour) => {
		let hex = colour.replace(/#/, ''),
			r 	= parseInt(hex.substr(0, 2), 16),
			g 	= parseInt(hex.substr(2, 2), 16),
			b 	= parseInt(hex.substr(4, 2), 16);

		return [
			0.299 * r,
			0.587 * g,
			0.114 * b
		].reduce((a, b) => a + b) / 255;
	},

	primeCaptionContrast: (node) => {
		if(node == null) {
			return;
		}
		let dominant;
		if((dominant = node.getAttribute('data-dominant-colour')) != null) {
			let luma 	= cinematt.utils.hexToLuma(dominant),
				caption = node.querySelector('figcaption');

			node.removeAttribute('data-dominant-colour');
			caption.classList.add((luma >= 0.5 ? 'bright':'dark'));
		}
	},

	lazyLoadImages: (selector) => {
		let images = [...document.querySelectorAll(selector)];
		images.filter(image => {
			return cinematt.utils.inView(image) && !cinematt.utils.hasLoaded(image);
		}).forEach(cinematt.utils.primeImage);
	},

	imageLoaded: (evt) => {
		let image 	= evt.target, 
			picture = image.parentNode,
			figure 	= picture.parentNode;

		picture.removeAttribute('data-colours');

		if('ontouchstart' in window) {
			picture.classList.add('loaded');
			picture.classList.add('is-touch');
		}
		else {
			picture.classList.add('loaded');
		}
	}

};