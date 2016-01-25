var EventEmitter = require('events').EventEmitter;

var _totalCards = 49;
var _lotIDs = [];
var _cardColors = [];
var _eogCardAdded = false;

function initLotIDs(){
	_lotIDs = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9'];
}

function initCardColors(){
	var colors = ['aqua', 'brown', 'gold', 'purple', 'silver'];
	for (var i in colors){
		for (var j=0; j<9; j++){
			_cardColors.push(colors[i]);
		}
	}
	_cardColors = _cardColors.concat(['strip', 'strip']);
}

function initDeck(){
	_lotIDs = [];
	_cardColors = [];
	initLotIDs();
	initCardColors();
}

function drawCard(){
	var cardObj = {
		'color': null,
		'lotId': null,
		'description': ''
	},
	numCards = _cardColors.length,
	drawnColor = Math.floor(Math.random() * (numCards)),
	drawnLot = Math.floor(Math.random() * (numCards));

	cardObj.color = _cardColors[drawnColor];
	cardObj.lotId = _lotIDs[drawnLot];

	removeCard(drawnColor, drawnLot);

	if(!_eogCardAdded && _cardColors.length <= _totalCards*.25){
		_cardColors.push('strip');
		_eogCardAdded = true;
	}

	if (_eogCardAdded && cardObj.color == 'strip' && _cardColors.indexOf('strip') == -1){
		cardObj.lotId = 'GAME OVER';
	}

	return cardObj;
}

function removeCard(drawnColor, drawnLot){
	_cardColors.splice(drawnColor, 1);
	_lotIDs.splice(drawnLot, 1);
}

var CardDeckStore = Object.assign({}, EventEmitter.prototype, {
	init: function(){
		initDeck();
	},
	drawCard: function(){
		return drawCard();
	}

});

module.exports = CardDeckStore;