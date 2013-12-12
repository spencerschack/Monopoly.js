Monopoly.Square.Chance = Class(Monopoly.Square, {

	name: "Chance",

	land: function(player, cb) {
		this.game.log(" - landed on " + this);
		this.game.chanceDeck.draw(player, cb);
	}

});