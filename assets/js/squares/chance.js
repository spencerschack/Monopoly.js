Monopoly.Square.Chance = Class(Monopoly.Square, {

	name: "Chance",

	land: function(player, cb) {
		console.log(" - landed on " + this);
		this.game.chanceDeck.draw(player, cb);
	}

});