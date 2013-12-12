Monopoly.Square.Go = Class(Monopoly.Square, {

	name: "Go",

	next: "MediterraneanAvenue",

	enter: function(player, cb) {
		player.deposit(200, this.super.bind(this, player, cb));
	}

});