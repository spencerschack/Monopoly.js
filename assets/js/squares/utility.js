Monopoly.Square.Utility = Class(Monopoly.Square.Property, {

	price: 150,

	groupName: "utility",

	rent: function(player, cb) {
		if(player.rollTotal == 0) {
			this.game.die.roll(player, function(m, n) {
				cb(10 * (m + n));
			});
		} else {
			var coeff = this.groupMonopoly ? 10 : 4;
			cb(coeff * player.rollTotal);
		}
	}

});