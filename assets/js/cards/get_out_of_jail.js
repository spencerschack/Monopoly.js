Monopoly.Card.GetOutOfJail = Class(Monopoly.Card, {

	name: "Get out of jail, free",
	description: "This card may be kept until needed or sold.",

	draw: function(player, cb) {
		player.getOutOfJailCards.push(this);
		cb();
	}

});