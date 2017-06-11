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

const makeBars = () => {
	let cards = [...document.querySelectorAll('figure.photo-card')];
	cards.forEach(card => addBars(card));
};