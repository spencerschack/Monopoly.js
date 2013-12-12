Monopoly.Card.GoToJail = Class(Monopoly.Card, {

	name: "Go to jail",
	description: "Do not pass Go. Do not collect $200.",

	draw: function(player, cb) {
		player.goToJail(this.super.bind(this, player, cb));
	}

});