Monopoly.Card = Class({

	deck: null,
	name: null,
	description: null,

	initialize: function(deck) {
		this.deck = deck;
	},

	draw: function(player, cb) {
		this.deck.cards.push(this);
		cb();
	},

	toString: function() {
		return this.name;
	}

});