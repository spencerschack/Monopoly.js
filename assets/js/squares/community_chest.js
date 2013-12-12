Monopoly.Square.CommunityChest = Class(Monopoly.Square, {

	name: "Community Chest",

	land: function(player, cb) {
		this.game.log(" - landed on " + this);
		this.game.communityChestDeck.draw(player, cb);
	}

});