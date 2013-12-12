Monopoly.Card.AdvanceToNearestRailroad = Class(Monopoly.Card.Advance, {

	name: "Advance token to the nearest railroad",
	description: ("Pay owner twice the rental to which he is otherwise " +
		"entitled. If Railroad is unowned, you may buy it from the bank."),

	destination: function(player) {
		switch(player.currentSquare) {
			case this.deck.game.squares.Chance1:
				return "PennsylvaniaRailroad";
			case this.deck.game.squares.Chance2:
				return "BORailroad";
			case this.deck.game.squares.Chance3:
				return "ReadingRailroad";
		}
	}

});