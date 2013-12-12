Monopoly.Card.AdvanceToReadingRailroad = Class(Monopoly.Card.Advance, {

	name: "Take a ride on the Reading",
	description: "If you pass Go, collect $200",

	destination: function(player) { return "ReadingRailroad"; }

});