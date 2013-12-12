Monopoly.Square.Tax = Class(Monopoly.Square, {

	land: function(player, cb) {
		this.tax(player, function(amount) {
			player.withdraw(amount, cb);
		});
	}

});