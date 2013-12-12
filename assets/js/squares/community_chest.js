Monopoly.Square.CommunityChest = Class(Monopoly.Square, {

	name: "Community Chest",

	land: function(player, cb) {
		console.log(" - landed on " + this);
		this.game.communityChestDeck.draw(player, cb);
	}

});