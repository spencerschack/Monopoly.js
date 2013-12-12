Monopoly.Square = Class({

	name: null,
	game: null,
	elements: null,
	classNames: "square",

	next: null,
	prev: null,

	get id() {
		return this.className.dasherize();
	},

	initialize: function(game) {
		this.game = game;
		this.elements = $();
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
		this.game.log(" - landed on " + this);
		cb();
	},

	exit: function(player, cb) {
		this.next.enter(player, cb);
	},

	render: function(parent) {
		this.elements = this.elements.add($("<div />")
			.addClass(this.classNames)
			.attr("id", this.id)
			.append(
				$("<span />")
					.addClass("name")
					.text(this.name)
			).appendTo(parent));
	},

	toString: function() {
		return this.name;
	}

});