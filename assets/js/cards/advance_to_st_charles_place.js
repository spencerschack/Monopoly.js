Monopoly.Card.AdvanceToStCharlesPlace = Class(Monopoly.Card.Advance, {

	name: "Advance to St.Charles Place",
	description: "If you pass Go, collect $200",

	destination: function(player) { return "StCharlesPlace"; }

});