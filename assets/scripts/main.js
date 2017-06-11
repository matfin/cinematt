'use strict';

if(window.cinematt == null) {
	window.cinematt = {};
}

onload = () => {
	makeBars();	
};

const addBars = (photo_card) => {
	let colours = photo_card.getAttribute('data-colours');
	photo_card.removeAttribute('data-colours');
	photo_card.style.backgroundImage = `linear-gradient(to right, ${colours})`;
};

const addGradients = (photo_card) => {
	let colours = photo_card.getAttribute('data-colours').split(','),
		step = 100 / colours.length;

	let gradient = colours.map((colour, index) => `${colour} ${index * step}%, ${colour} ${++index * step}%`).join(',');
	photo_card.style.backgroundImage = `linear-gradient(to right, ${gradient})`;
};

const makeBars = () => {
	let cards = [...document.querySelectorAll('figure.photo-card')];
	// cards.forEach(card => addBars(card));
	cards.forEach(addGradients);
};