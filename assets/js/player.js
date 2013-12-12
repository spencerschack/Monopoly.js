Monopoly.Player = Class({

	game: null,

	element: null,

	currentSquare: null,

	next: null,
	prev: null,

	name: null,
	money: 1500,
	properties: null,
	getOutOfJailCards: null,
	rollTotal: 0,
	rollLeft: 0,
	doubles: 0,
	jailTurns: 0,
	doubleRailroadRent: true,

	get totalWorth() {
		var sum = this.money;
		Object.keys(this.properties).forEach(function(property) {
			sum += this.properties[property].price;
		}, this);
		return sum;
	},

	initialize: function(game) {
		this.game = game;
		this.name = "Player " + ++Monopoly.Player.count;
		this.currentSquare = this.game.squares.Go;
		this.properties = {};
		this.getOutOfJailCards = [];
	},

	moveTo: function(square, cb) {
		this.currentSquare = square;
		var top  = parseInt(square.element.css("top")) + square.element.height() / 2
		  , left = parseInt(square.element.css("left")) + square.element.width() / 2;
		$(this.element).animate({
			top: top,
			left: left
		}, cb);
	},

	ask: function(message, yes, no) {
		if(confirm(message)) {
			yes();
		} else {
			no();
		}
	},

	askBuy: function(square, yes, no) {
		if(this.money > 300) {
			yes();
		} else {
			no();
		}
	},

	askJail: function(yes, no) {
		if(this.money > 300) {
			yes();
		} else {
			no();
		}
	},

	askAuction: function(square, price, bid, decline) {
		if(this.money > 300 && price < square.price + 50) {
			bid(price + 10);
		} else {
			decline();
		}
	},

	askTurn: function(cb) {
		var possibles = [];
		Object.keys(this.properties).forEach(function(property) {
			property = this.properties[property];
			if(property.canImprove && property.improvePrice < this.money + 300) {
				possibles.push(property);
			}
		}, this);
		if(possibles.length > 0) {
			possibles[Math.floor(Math.random() * possibles.length)].improve(this, cb);
		} else {
			cb();
		}
	},

	askIncomeTax: function(twoHundred, tenPercent) {
		var percent = Math.round(this.totalWorth * 0.1);
		if(percent > 200) {
			twoHundred();
		} else {
			tenPercent(percent);
		}
	},

	turn: function(cb) {
		this.askTurn(this.play.bind(this, cb));
	},

	play: function(cb) {
		console.log(this + " ($" + this.money +") (" + this.currentSquare + ")");
		if(this.currentSquare == this.game.squares.Jail) {
			this.askJail(function() {
				this.withdraw(50, function() {
					this.currentSquare = this.game.squares.VisitingJail;
					this.roll(cb)
				}.bind(this));
			}.bind(this),
				this.roll.bind(this, cb));
		} else {
			this.roll(cb);
		}
	},

	roll: function(cb) {
		this.game.die.roll(this, function(m, n) {
			this.rollLeft = this.rollTotal = m + n;
			this.doubles = m == n ? this.doubles + 1 : 0;
			if(this.doubles == 3) {
				this.goToJail(cb);
			} else {
				this.currentSquare.exit(this, function() {
					if(this.doubles == 0) {
						cb();
					} else {
						this.play(cb);
					}
				}.bind(this));
			}
		}.bind(this));
	},

	goToJail: function(cb) {
		this.doubles = 0;
		this.moveTo(this.game.squares.Jail, cb);
	},

	deposit: function(amount, cb) {
		console.log(" - deposit $" + amount + " to " + this);
		this.money += amount;
		this.renderMoney();
		cb();
	},

	withdraw: function(amount, cb) {
		console.log(" - withdraw $" + amount + " from " + this);
		if(amount > this.money) {
			this.bankrupt();
		} else {
			this.money -= amount;
			this.renderMoney();
			cb();
		}
	},

	transfer: function(receiver, amount, cb) {
		this.withdraw(amount, receiver.deposit.bind(receiver, amount, cb));
	},

	bankrupt: function() {
		console.log(" - went bankrupt");
		this.element.remove();
		this.game.remove(this);
	},

	render: function(parent) {
		this.element = $("<div />")
			.addClass("player " + this.piece)
			.append(
				$("<span />").addClass("piece")
			).appendTo(parent);
		this.renderMoney();
	},

	renderMoney: function() {
		this.element.find(".money").text("$" + this.money);
	},

	toString: function() {
		return this.name;
	}

}).mixin({
	count: 0
});