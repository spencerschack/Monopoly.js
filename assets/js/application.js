//= require_tree lib
//= require monopoly
//= require square
//= require squares/property
//= require squares/railroad
//= require squares/utility
//= require squares/chance
//= require squares/community_chest
//= require squares/tax
//= require_tree squares
//= require player
//= require deck
//= require_tree decks
//= require card
//= require cards/advance
//= require cards/money
//= require cards/repairs
//= require_tree cards
//= require die

$.fx.speeds._default = 300;

window.addEventListener("DOMContentLoaded", function() {
	window.game = new Monopoly(document.body);
});