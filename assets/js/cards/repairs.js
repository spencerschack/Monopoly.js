Monopoly.Card.Repairs = Class(Monopoly.Card, {

	draw: function(player, cb) {
		var amount = 0;
		Object.keys(player.properties).forEach(function(property) {
			var houses = player.properties[property].houses;
			amount += this.houseCost * (houses == 5 ? 0 : houses)
			        + this.hotelCost * (houses == 5 ? 1 : 0);
		}, this);
		player.withdraw(amount, this.super.bind(this, player, cb));
	}

});