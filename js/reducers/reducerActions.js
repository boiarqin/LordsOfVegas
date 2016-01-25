var data = require('../data');

var ReducerActions = {
	buildCasino : function(ownedLots, casinos, playerColor, lotId, tileColor){
		var ownedLots = {...ownedLots},
			casinos = [...casinos];
		ownedLots[lotId].isBuilt = true;
		ownedLots[lotId].casinoColor = tileColor;

		//check adjacent lots for same color
		var lotRegion = lotId.charAt(0),
			lotNumber = parseInt(lotId.charAt(1)),
			adjacentTop = (lotNumber - 3 > 0 ? lotNumber - 3 : 0),
			adjacentBottom = lotNumber + 3,
			adjacentLeft = (lotNumber % 3 === 1 ? 0 : lotNumber - 1),
			adjacentRight = (lotNumber % 3 === 0 ? 0 : lotNumber + 1),
			adjacentLotNums = [adjacentTop, adjacentLeft, adjacentRight, adjacentBottom],
			adjacentLotIds = adjacentLotNums.map(num => lotRegion + num),
			sameColorAdjacentLotData = adjacentLotIds.filter(id => (ownedLots[id] && ownedLots[id].casinoColor == tileColor));
			adjacentCasinos = [];

		for (var i in sameColorAdjacentLotData){
			var tempLotId = sameColorAdjacentLotData[i];
			//find casino for this lot
			var index = casinos.findIndex(casino => casino.lots.indexOf(tempLotId) > -1);
			if (index > -1){
				adjacentCasinos.push(casinos.splice(index, 1)[0]);
			}
		}

		//concat everything in tempCasinoArray
		if (adjacentCasinos.length > 0){
			var adjacentCasinosLots = adjacentCasinos.map(casino => casino.lots);
			var newCasinoLots = Array.prototype.concat.call([lotId],...adjacentCasinosLots);
			casinos.push({
				"casinoColor" : tileColor,
				"lots" : newCasinoLots
			});	
		}
		else{
			casinos.push({
				"casinoColor" : tileColor,
				"lots" : [lotId]
			});
		}
		return {
			ownedLots,
			casinos
		};
	}
}

module.exports = ReducerActions;