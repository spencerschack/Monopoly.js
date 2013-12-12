Monopoly.Square = Class({

	name: null,
	game: null,
	element: null,
	classNames: "square",

	next: null,
	prev: null,

	get id() {
		return this.className.dasherize();
	},

	initialize: function(game) {
		this.game = game;
	},

	enter: function(player, cb) {
		player.rollLeft--;
		var func = player.rollLeft ? this.exit : this.land;
		player.moveTo(this, func.bind(this, player, cb));
	},

	land: function(player, cb) {
		if(player.currentSquare != this) {
			debugger;
		}
		console.log(" - landed on " + this);
		cb();
	},

	exit: function(player, cb) {
		this.next.enter(player, cb);
	},

	render: function(parent) {
		this.element = $("<div />")
			.attr({ id: this.id, class: this.classNames})
			.append(
				$("<span />")
					.addClass("name")
					.text(this.name)
			).appendTo(parent);
	},

	toString: function() {
		return this.name;
	}

});