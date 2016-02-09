var data = require('../data');

var ReducerHelpers = {
	addMoney : function(scores, playerColor, amount){
		var newScores = [...scores];
		var playerScore = newScores.find(player => player.color === playerColor);
		playerScore.cash += amount;

		return newScores;
	},

	lotLookup : function(lotId){
		var lotType = data.defaults.board.lots[lotId],
			lotData = data.defaults.board.lotTypes[lotType];
		return {
			lotId,
			lotType,
			...lotData
		}
	},

	assignLot : function(ownedLots, playerColor, defaultLotData, isSquatting){

		var lotData = {
			"playerColor" : playerColor,
			"casinoColor" : "",
			"dieValue" : defaultLotData.dieValue,
			"isBuilt" : false,
			"isSquatting" : isSquatting ? isSquatting : false
		}
		return {
			...ownedLots,
			[defaultLotData.lotId]: lotData
		}
	}

}

module.exports = ReducerHelpers;