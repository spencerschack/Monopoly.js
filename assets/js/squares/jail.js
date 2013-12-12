Monopoly.Square.Jail = Class(Monopoly.Square, {

	name: "Jail",

	next: "StCharlesPlace",

	exit: function(player, cb) {
		if(player.doubles == 3) {
			player.doubles = 0;
			cb();
		} else if(player.doubles == 1) {
			player.doubles = 0;
			this.super(player, cb);
		} else {
			player.jailTurns++;
			if(player.jailTurns == 3) {
				player.jailTurns = 0;
				player.withdraw(50, cb);
			} else {
				cb();
			}
		}
	}

});