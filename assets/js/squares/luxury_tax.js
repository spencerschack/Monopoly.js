Monopoly.Square.LuxuryTax = Class(Monopoly.Square.Tax, {

	name: "Luxury Tax",

	next: "Boardwalk",

	tax: function(player, cb) {
		cb(75);
	}
	
});