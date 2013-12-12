Monopoly.Deck = Class({

	initialize: function(game) {
		var cardClasses = this.cards;
		this.game = game;
		this.cards = [];
		this.order = [];
		cardClasses.forEach(function(card) {
			this.cards.push(new Monopoly.Card[card](this));
		}, this);
		this.shuffle();
	},

	draw: function(player, cb) {
		console.log(" - drew " + this.cards[0] + " (" + this.cards[0].description + ")");
		this.cards.shift().draw(player, cb);
	},

	shuffle: function() {
	    var counter = this.cards.length, temp, index;
	    while (counter--) {
	        index = (Math.random() * counter) | 0;
	        temp = this.cards[counter];
	        this.cards[counter] = this.cards[index];
	        this.cards[index] = temp;
	    }
	}

});