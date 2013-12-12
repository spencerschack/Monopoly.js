Monopoly.Die = Class({

	initialize: function(game) {
		this.game = game;
	},

	roll: function(player, cb) {

		var m = this.random()
		  , n = this.random();

		this.game.log(" - rolled ", m, n);
		cb(m, n);

	},

	random: function() {
		return Math.ceil(Math.random() * 6);
	}

});