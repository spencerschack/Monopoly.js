Monopoly.Square.IncomeTax = Class(Monopoly.Square.Tax, {

	name: "Income Tax",

	next: "ReadingRailroad",

	tax: function(player, cb) {
		player.askIncomeTax(function() { cb(200); },
			function(tenPercent) { cb(tenPercent); });
	}

});