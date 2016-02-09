var CardDeckStore = require('../stores/cardDeckStore');
var {addMoney, lotLookup, assignLot} = require('./reducerHelpers');
var {buildCasino} = require('./reducerActions');
var data = require('../data');

var validateSelection = function(state, lotId){
	var ownedLots = state.ownedLots;
	var actionType = state.actionType;
	switch (actionType){
		case 'build':
			//true if player owns lot
			var isOwned = ownedLots[lotId];
			var isOwnedByPlayer = isOwned ? ownedLots[lotId].playerColor == state.activePlayer : false;
			var isBuilt = isOwned ? ownedLots[lotId].isBuilt : false;
			return (isOwned && isOwnedByPlayer && !isBuilt);
		case 'sprawl':
			//true if player owns adjacent casino and has tiles available


		case 'remodel':
			//true if player owns casino

		case 'reorganize':
			//true if player owns casino

		case 'gamble':
			return false;
		default:
			return false;
	}
}
var getCasinoBoss = function(ownedLots, casino){
	var lots = casino.lots;
	var lotsData = lots.map(id => {return {lotId: id, ...(ownedLots[id])}});
	var bossLotData = lotsData.reduce((prev, curr) => {
		if (curr.dieValue > prev.dieValue){
			return curr;
		}
		else {
			return prev;
		}
	});
	var boss = ownedLots[bossLotData.lotId].playerColor;
	return boss;
}
var payOut = function(ownedLots, casinos, scores, cardColor){
	var payoutAmounts = {
		'red' : 0,
		'yellow' : 0,
		'green' : 0,
		'blue' : 0
	},
		payoutPoints = {
			'red' : 0,
			'yellow' : 0,
			'green' : 0,
			'blue' : 0
		};
	var scores = [...scores];
	//pay owned lots
	for (var i in ownedLots){
		var lot = ownedLots[i];
		if (!lot.isBuilt){
			payoutAmounts[lot.playerColor]++
		}
	}

	//pay casinos
	var casinos = [...casinos];
	for (var k in casinos){
		var casino = casinos[k];
		var casinoColor = ownedLots[casino.lots[0]].casinoColor;

		if (casinoColor === cardColor){
			var boss = getCasinoBoss(ownedLots, casino);
			payoutPoints[boss] += casino.lots.length;
		}
	}

	for (var j in scores){
		var playerScore = scores[j];
		playerScore.cash += payoutAmounts[playerScore.color];
		playerScore.score += payoutPoints[playerScore.color];
		//round score
		var validScore = data.defaults.board.scoringTrack.indexOf(playerScore.score);
		if (validScore === -1){
			var lowerScores = data.defaults.board.scoringTrack.filter(num => num < playerScore.score);
			playerScore.score = lowerScores[lowerScores.length-1];
		}
	}

	return scores;
}

var drawNewCard = function(ownedLots, activePlayer){
	var newCard = CardDeckStore.drawCard(),
		lotData = lotLookup(newCard.lotId),
		endOfGame = false;
		ownedLots = {...ownedLots};

		if (newCard.lotId === 'GAME OVER'){
			endOfGame = true;
		}
		else{
			ownedLots = assignLot(ownedLots, activePlayer, lotData);
		}

		return {
			ownedLots,
			endOfGame,
			newCard
		}
}

var Reducer = function (state, action){
	if (typeof state === 'undefined'){
		state = data.defaults.state;
	}
	console.log(action.type);
	switch (action.type){
		case 'INITIALIZE_GAME':
			CardDeckStore.init();
			var ownedLots = {...state.ownedLots};
			var scores = [...state.scores];
			for(var i=0; i<4; i++){
				var playerColor = data.defaults.players.colors[i];
				for(var j=0; j<2; j++){
					var startingCard = CardDeckStore.drawCard(),
						startingLotData = lotLookup(startingCard.lotId);
				
					ownedLots = assignLot(ownedLots, playerColor, startingLotData);
					scores = addMoney(scores, playerColor, startingLotData.startingAmount);
				}
			}
			//draw new card
			var {ownedLots, endOfGame, newCard} = drawNewCard(ownedLots, state.activePlayer);
			scores = payOut(ownedLots, state.casinos, scores, newCard.color);

			return {
				...state,
				ownedLots,
				scores,
				cardState: newCard
			}
		
		case 'END_TURN':
			//change players
			var currentIndex = data.defaults.players.colors.indexOf(state.activePlayer);
			var activePlayer = data.defaults.players.colors[(currentIndex + 1) % 4];

			//draw new card
			var {ownedLots, endOfGame, newCard} = drawNewCard(state.ownedLots, activePlayer);
			var scores = payOut(state.ownedLots, state.casinos, state.scores, newCard.color);

			return {
				...state,
				activePlayer,
				actionType: null,
				actionSelected: false,
				tileSelected: null,
				tileHovered: null,
				lotData: null,
				cardState: newCard,
				ownedLots,
				scores,
				endOfGame
			}
		
		case 'SELECT_ACTION':
			return {
				...state,
				actionType: action.actionType,
				actionSelected: true,
				tileHovered: null,
				lotData
			}
		case 'CANCEL_ACTION':
			return {
				...state,
				tileSelected: null,
				tileHovered: null,
				lotData: null
			}
		case 'CONFIRM_BUILD':
			var {casinos, ownedLots} = buildCasino(state.ownedLots, state.casinos, state.activePlayer, state.tileSelected, action.params.tileColor);
			var scores = addMoney(state.scores, state.activePlayer, -(state.lotData.buildCost));

			return {
				...state,
				casinos,
				ownedLots,
				scores,
				tileSelected: null,
				tileHovered: null,
				lotData: null
			}
		case 'SELECT_TILE':
			if (state.actionSelected){
				if(validateSelection(state, action.lotId)){
					var lotType = data.defaults.board.lots[action.lotId];
					var lotData = data.defaults.board.lotTypes[lotType];
					return {
						...state,
						tileSelected: action.lotId,
						lotData
					}
				}
			}
			
			return state;
			
		case 'HOVER_ON_TILE':
			if (state.actionSelected){// && !state.tileSelected){
				if(validateSelection(state, action.lotId)){
					var lotType = data.defaults.board.lots[action.lotId];
					var lotData = data.defaults.board.lotTypes[lotType];

					return {
						...state,
						tileHovered: action.lotId,
						lotData
					}
				}
				
			}
			return {
				...state,
				tileHovered: null,
				//lotData: null
			};
		case 'HOVER_OFF_TILE':
			if (state.actionSelected && !state.tileSelected){
				return {
					...state,
					tileHovered: null,
					lotData: null
				};
			}
			else{
				return state;	
			}
		default:
			return {
				...state,
				//cardState: CardDeckStore.drawCard()
			};
	}
}

module.exports = Reducer;