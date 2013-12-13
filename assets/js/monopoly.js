var Monopoly = Class({

	board: null,

	elements: null,

	squares: [
		"Go",
		"MediterraneanAvenue",
		"CommunityChest1",
		"BalticAvenue",
		"IncomeTax",
		"ReadingRailroad",
		"OrientalAvenue",
		"Chance1",
		"VermontAvenue",
		"ConnecticutAvenue",
		"Jail",
		"VisitingJail",
		"StCharlesPlace",
		"ElectricCompany",
		"StatesAvenue",
		"VirginiaAvenue",
		"PennsylvaniaRailroad",
		"StJamesPlace",
		"CommunityChest2",
		"TennesseeAvenue",
		"NewYorkAvenue",
		"FreeParking",
		"KentuckyAvenue",
		"Chance2",
		"IndianaAvenue",
		"IllinoisAvenue",
		"BORailroad",
		"AtlanticAvenue",
		"VentnorAvenue",
		"WaterWorks",
		"MarvinGardens",
		"GoToJail",
		"PacificAvenue",
		"NorthCarolinaAvenue",
		"CommunityChest3",
		"PennsylvaniaAvenue",
		"ShortLine",
		"Chance3",
		"ParkPlace",
		"LuxuryTax",
		"Boardwalk"
	],

	players: [
		"Player",
		"Player",
		"Player"
	],

	turn: 0,

	currentPlayer: null,

	initialize: function(element, options) {

		this.elements = $();

		options || (options = {});
		this.debug = options.debug || false;

		var squareClasses = this.squares;
		this.squares = {};

		squareClasses.forEach(function(klass) {
			this.squares[klass] = new Monopoly.Square[klass](this);
			this.squares[klass].className = klass;
		}, this);

		Object.keys(this.squares).forEach(function(square) {
			var square = this.squares[square]
			  , next   = this.squares[square.next];
			square.next = next;
			next.prev   = square;
		}, this);

		var playerClasses = this.players;
		this.players = [];

		playerClasses.forEach(function(klass) {
			this.players.push(new Monopoly[klass](this));
		}, this);

		this.players.forEach(function(player, index) {
			player.piece = Monopoly.Pieces.splice(Math.floor(Math.random() * Monopoly.Pieces.length), 1)[0];
			player.prev = this.players[Math.mod(index - 1, this.players.length)];
			player.next = this.players[(index + 1) % this.players.length];
		}, this);

		this.die = new Monopoly.Die(this);
		this.chanceDeck = new Monopoly.ChanceDeck(this);
		this.communityChestDeck = new Monopoly.CommunityChestDeck(this);

		this.render(element);
		$(window).on("scroll resize", this.scroll.bind(this))
			.scrollLeft(this.elements.width());

		this.currentPlayer = this.players[0];
		this.play();
	},

	play: function() {
		this.turn++;
		this.log("================================");
		this.log("Turn " + this.turn);
		this.advance();
	},

	advance: function() {
		this.currentPlayer.turn(function() {
			this.currentPlayer = this.currentPlayer.next;
			if(this.currentPlayer == this.players[0]) {
				setTimeout(this.play.bind(this), 0);
			} else {
				setTimeout(this.advance.bind(this), 0);
			}
		}.bind(this));
	},

	remove: function(player) {
		var index = this.players.indexOf(player);
		this.players.splice(index, 1);
		player.prev.next = player.prev.next.next;
		player.next.prev = player.next.prev.prev;
		this.currentPlayer = player.next;
		if(this.players.length == 1) {
			this.log("=================================");
			this.log(this.players[0] + " won");
		} else {
			this.advance();
		}
	},

	scroll: function() {
		var $window    = $(window)
		  , halfWindow = $window.width() / 2
		  , board      = this.elements.width()
		  , scrollLeft = $window.scrollLeft();
		if(scrollLeft < board / 2 - halfWindow) {
			$window.scrollLeft(scrollLeft + board);
		} else if(scrollLeft > 3 * board / 2 - halfWindow) {
			$window.scrollLeft(scrollLeft - board);
		}
	},

	render: function(parent) {
		var container = $("<div />").attr("id", "monopoly").appendTo(parent);
		for(var i = 0; i < 2; i++) {
			var el = $("<div />").addClass("board").appendTo(container);
			this.elements = this.elements.add(el);
			this.players.forEach(function(player) {
				player.render(el);
			}, this);
			Object.keys(this.squares).forEach(function(square) {
				this.squares[square].render(el);
			}, this);
		}
	},

	log: function() {
		if(this.debug) {
			console.log.apply(console, arguments);
		}
	}

}).mixin({
	Pieces: ["wheelbarrow", "thimble", "shoe", "ship", "iron", "hat", "dog", "car"]
});