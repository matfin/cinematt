'use strict';

if(window.cinematt == null) {
	window.cinematt = {};
}

onload = () => {
	makeBars();	
};

const addBars = (photo_card) => {
	let colours = photo_card.getAttribute('data-colours').split(',');
	colours.map(colour => {
		let node = document.createElement('div');
		node.classList.add('bar');
		node.style.background = `${colour}`;
		return node;
	}).forEach(node => photo_card.appendChild(node));
};

const makeBars = () => {
	let cards = [...document.querySelectorAll('figure.photo-card')];
	cards.forEach(card => addBars(card));
};