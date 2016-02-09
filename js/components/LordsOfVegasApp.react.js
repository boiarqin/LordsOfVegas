var { connect } = require('react-redux');

var ScoringTrack = require('./scoringTrack/scoringTrack.react');
var GameBoard = require('./gameBoard/gameBoard.react');

var Card = require('./card.react');
var ActionCard = require('./actionCard/actionCard.react');
var PlayerActions = require('./playerActions.react');

var PlayerStats = require('./stats/playerStats.react');
var TileStats = require('./stats/tileStats.react');
var PropertyStats = require('./stats/propertyStats.react');

var actionCreators = require('../actionCreators/actionCreators');



var LordsOfVegasApp = React.createClass({
	propTypes : {
		'activePlayer': React.PropTypes.string,
	  	'scores': React.PropTypes.arrayOf(
	  		React.PropTypes.shape({
	  			'color': React.PropTypes.string,
				'score': React.PropTypes.number,
				'cash': React.PropTypes.number
	  		})
	  	),
	  	'ownedLots': React.PropTypes.shape({
	  		'playerColor' : React.PropTypes.string,
			'casinoColor' : React.PropTypes.string,
			'dieValue' : React.PropTypes.number,
			'isBuilt' : React.PropTypes.bool,
			'isSquatting' : React.PropTypes.bool
	  	}),
	  	'casinos': React.PropTypes.arrayOf(React.PropTypes.shape({
	  		'casinoColor' : React.PropTypes.string,
			'lots' : React.PropTypes.arrayOf(React.PropTypes.string)
	  	})),
	  	'actionSelected': React.PropTypes.bool,
	  	'actionType': React.PropTypes.string,
	  	'tileSelected': React.PropTypes.string,
	  	'tileHovered': React.PropTypes.string,
	  	'lotData' : React.PropTypes.shape({
			'lotId' : React.PropTypes.string,
			'buildCost' : React.PropTypes.number,
			'dieValue' : React.PropTypes.number,
			'casinoColor' : React.PropTypes.string,
			'playerColor' : React.PropTypes.string,
			'isOwned' : React.PropTypes.bool,
			'isBuilt' : React.PropTypes.bool
		}),
	  	'cardState': React.PropTypes.shape({
	  		'color' : React.PropTypes.string,
	  		'lotId' : React.PropTypes.string
	  	}),
	  	'endOfGame': React.PropTypes.bool
	},
	getInitialState: function(){
		this.props.dispatch(actionCreators.initialize());
		return {};
	},
	componentDidMount: function() {
	    //TodoStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
	    //TodoStore.removeChangeListener(this._onChange);
	},
	render: function(){
		var cardTemplate;
		const { dispatch } = this.props;

		if (this.props.actionSelected){
			cardTemplate = (<ActionCard
								actionsDefaults={this.props.actionsDefaults}
								actionType={this.props.actionType}
								tileHovered={this.props.tileHovered}
								tileSelected={this.props.tileSelected}
								lotData = {this.props.lotData}
								activePlayer = {this.props.activePlayer}
								scores = {this.props.scores}
								confirmAction = {(actionType, params) => dispatch(actionCreators.confirmAction(actionType, params))}
								cancelAction={() => dispatch(actionCreators.cancelAction())}/>)
		}
		else if(this.props.cardState){
			cardTemplate = (<Card cardsDefaults={this.props.cardsDefaults} cardState={this.props.cardState} endOfGame={this.props.endOfGame}/>)
		}
		return (
			<div className = "app">
				<div className="app-board">
					<ScoringTrack scoringTrackDefaults={this.props.gameBoardDefaults.scoringTrack} scores={this.props.scores}/>
					<GameBoard
						gameBoardDefaults={this.props.gameBoardDefaults}
						ownedLots={this.props.ownedLots}
						selectTile={tileID => dispatch(actionCreators.selectTile(tileID))}
            			hoverOnTile={tileID => dispatch(actionCreators.hoverOnTile(tileID))}
            			hoverOffTile={tileID => dispatch(actionCreators.hoverOffTile(tileID))}/>
				</div>
				<div className="app-actions">
					{cardTemplate}
					
					<PlayerActions
						actionsDefaults={this.props.actionsDefaults}
						endOfGame={this.props.endOfGame}
						handleActionButton={actionType =>
            				dispatch(actionCreators.selectAction(actionType))
          			}/>
					
				</div>
				<div className="app-stats">
					<PlayerStats scores={this.props.scores} activePlayer={this.props.activePlayer}/>
					<TileStats casinosDefaults={this.props.casinosDefaults} casinos={this.props.casinos}/>
					<PropertyStats scores={this.props.scores} ownedLots={this.props.ownedLots} casinos={this.props.casinos}/>
				</div>
			</div>
		);
	},
	/*
	_onChange: function() {
	    this.setState(getGameState());
	}
	*/
});

function select(state) {
	console.log('state');
	console.log(state);
  return {
  	activePlayer: state.activePlayer,
  	scores: state.scores,
  	ownedLots: state.ownedLots,
  	casinos: state.casinos,
  	actionSelected: state.actionSelected,
  	actionType: state.actionType,
  	tileSelected: state.tileSelected,
  	tileHovered: state.tileHovered,
  	lotData: state.lotData,
  	cardState: state.cardState,
  	endOfGame: state.endOfGame,

    //visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    //visibilityFilter: state.visibilityFilter
  }
}


module.exports = connect(select)(LordsOfVegasApp);