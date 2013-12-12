Monopoly.Card.GoBackThreeSpaces = Class(Monopoly.Card, {

	name: "Go back 3 spaces",

	draw: function(player, cb) {
		this.move(player, 3, this.super.bind(this, player, cb));
	},

	move: function(player, n, cb) {
		if(n == 0) {
			player.currentSquare.land(player, cb);
		} else {
			player.moveTo(player.currentSquare.prev,
				this.move.bind(this, player, n - 1, cb));
		}
	}

});