Monopoly.Square.Property = Class(Monopoly.Square, {

	color: null,
	owner: null,
	groupName: null,
	group: null,
	houses: 0,
	mortgaged: false,

	get classNames() {
		if(!this.groupName) debugger;
		return this.super() + " " + this.groupName.dasherize();
	},

	get groupMonopoly() {
		var owned = 0;
		this.group.forEach(function(property) {
			if(this.owner.properties[property]) {
				owned++;
			}
		}, this);
		return owned == this.group.length;
	},

	initialize: function(game) {
		this.super(game);
		var groups = Monopoly.Square.Property.groups
		  , group  = groups[this.groupName];
		if(!group) {
			group = groups[this.groupName] = [];
		}
		this.group = group;
		group.push(this);
	},

	land: function(player, cb) {
		this.game.log(" - landed on " + this);
		if(this.owner) {
			if(player == this.owner) {
				cb();
			} else {
				this.rent(player, function(amount) {
					player.transfer(this.owner, amount, cb);
				}.bind(this));
			}
		} else {
			if(player.money > this.price) {
				player.askBuy(this, this.buy.bind(this, player, cb),
					this.auction.bind(this, cb));
			} else {
				cb();
			}
		}
	},

	auction: function(cb) {
		var players = this.game.players.slice();
		this.bid(players, 0, 0, cb);
	},

	bid: function(players, index, amount, cb) {
		if(players.length == 1) {
			this.buy(players[0], cb);
		} else {
			players[index].askAuction(this, amount, function(bid) {
				this.bid(players, (index + 1) % players.length, bid, cb);
			}.bind(this), function() {
				players.splice(index, 1);
				this.bid(players, (index + 1) % players.length, amount, cb);
			}.bind(this));
		}
	},

	buy: function(player, cb) {
		this.owner = player;
		player.properties[this] = this;
		player.withdraw(this.price, cb);
		this.elements.find(".owner").addClass(player.piece);
	},

	rent: function(player, cb) {
		if(this.houses) {
			cb(this.rents[this.houses]);
		} else {
			var coeff = this.groupMonopoly ? 2 : 1;
			cb(this.rents[0] * coeff);
		}
	},

	render: function(parent) {
		this.super(parent);
		this.elements.append($("<span />").addClass("owner"));
		this.elements.append($("<span />").addClass("price").text("$" + this.price));
		if(this.improvePrice) {
			this.elements = this.elements.append($("<span />")
				.addClass("improvements"));
		}
	},

	renderImprovements: function() {
		this.elements.find(".improvements").text(this.houses);
	},

	improve: function(player, cb) {
		if(this.canImprove) {
			player.withdraw(this.improvePrice, function() {
				this.houses++;
				this.renderImprovements();
				cb();
			}.bind(this));
		} else {
			throw "CANNOT IMPROVE";
		}
	},

	get canImprove() {
		return this.improvePrice && this.groupMonopoly && this.houses < 5;
	}

}).mixin({
	groups: {}
});
