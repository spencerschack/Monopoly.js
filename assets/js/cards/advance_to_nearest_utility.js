Monopoly.Card.AdvanceToNearestUtility = Class(Monopoly.Card.Advance, {

	name: "Advance token to the nearest utility",
	description: ("If unowned you may buy it from the bank. If owned, throw" +
		" dice and pay owner ten times the amount thrown."),

	destination: function(player) {
		switch(player.currentSquare) {
			case this.deck.game.squares.Chance1:
			case this.deck.game.squares.Chance3:
				return "ElectricCompany";
			case this.deck.game.squares.Chance2:
				return "WaterWorks";
		}
	}

});