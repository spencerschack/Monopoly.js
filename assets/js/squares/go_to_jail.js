Monopoly.Square.GoToJail = Class(Monopoly.Square, {

	name: "Go To Jail",

	next: "PacificAvenue",

	land: function(player, cb) {
		console.log(" - landed on " + this);
		player.doubles = 0;
		player.moveTo(this.game.squares.Jail, cb);
	}

});