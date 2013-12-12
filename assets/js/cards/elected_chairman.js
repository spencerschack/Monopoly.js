Monopoly.Card.ElectedChairman = Class(Monopoly.Card, {

	name: "You have been elected chairman of the board",
	description: "Pay each player $50",

	draw: function(player, cb) {
		this.transfer(player, player.next, this.super.bind(this, player, cb));
	},

	transfer: function(sender, receiver, cb) {
		if(sender == receiver) {
			cb();
		} else {
			sender.transfer(receiver, 50,
				this.transfer.bind(this, sender, receiver.next, cb));
		}
	}

});