Monopoly.Card.Advance = Class(Monopoly.Card, {

	draw: function(player, cb) {
		player.rollTotal = player.rollLeft = 0;
		var curr = player.currentSquare
		  , dest = this.deck.game.squares[this.destination(player)];
		if(!dest) debugger;
		while(curr != dest) {
			curr = curr.next;
			player.rollLeft++;
		}
		player.currentSquare.exit(player, this.super.bind(this, player, cb));
		this.deck.cards.push(this);
	}

})