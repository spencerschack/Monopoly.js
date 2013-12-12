Monopoly.Card.Money = Class(Monopoly.Card, {

	deposit: 0,
	withdraw: 0,

	draw: function(player, cb) {
		var next = this.super.bind(this, player, cb);
		if(this.deposit) {
			player.deposit(this.deposit, next);
		} else {
			player.withdraw(this.withdraw, next);
		}
	}

});