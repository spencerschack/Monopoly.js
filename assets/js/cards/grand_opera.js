Monopoly.Card.GrandOpera = Class(Monopoly.Card, {

	name: "Grand Opera Opening",
	description: "Collect $50 from each player for opening night seats",

	draw: function(player, cb) {
		this.transfer(player, player.next, this.super.bind(this, player, cb));
	},

	transfer: function(receiver, sender, cb) {
		if(sender == receiver) {
			cb();
		} else {
			sender.transfer(receiver, 50,
				this.transfer.bind(this, receiver.next, sender, cb));
		}
	}

});