var actionCreators = {
	initialize: function(){
		return {type: 'INITIALIZE_GAME'}
	},
	selectAction: function(actionType){
		if (actionType === "endturn"){
				return {type: 'END_TURN', actionType};	
		}
		else {
			return {type: 'SELECT_ACTION', actionType};	
		}
	},
	confirmAction: function(actionType, params){

		console.log('confirm');
		console.log(params);
		return {type: 'CONFIRM_'+actionType.toUpperCase(), params};
	},
	cancelAction: function(){
		return {type: 'CANCEL_ACTION'};
	},
	selectTile: function(lotId){
		return {type: 'SELECT_TILE', lotId};
	},
	hoverOnTile: function(lotId){
		return {type: 'HOVER_ON_TILE', lotId};
	},
	hoverOffTile: function(lotId){
		return {type: 'HOVER_OFF_TILE', lotId};
	}
}


module.exports = actionCreators;