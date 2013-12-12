Monopoly.Square.Railroad = Class(Monopoly.Square.Property, {

	groupName: "railroad",

	price: 200,

	rents: [25, 50, 100, 200],

	land: function(player, cb) {
		if(player.doubleRailroadRent) {
			player.doubleRailroadRent = false;
			this.doubleRent = !!this.owner;
		}
		this.super(player, cb);
	},

	rent: function(player, cb) {
		var count = 0
		  , coeff = 1;
		if(this.doubleRent) {
			this.doubleRent = false;
			coeff = 2;
		}
		this.group.forEach(function(sibling) {
			if(this.owner.properties[sibling]) {
				count++;
			}
		}, this);
		cb(coeff * this.rents[count]);
	}

});