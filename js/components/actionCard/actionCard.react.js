var classNames = require('classnames');
var GambleContent = require('./gambleContent.react');

var ActionCard = React.createClass({
	propTypes: {
		'confirmAction': React.PropTypes.func,
		'cancelAction': React.PropTypes.func,
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
		'scores': React.PropTypes.arrayOf(
	  		React.PropTypes.shape({
	  			'color': React.PropTypes.string,
				'score': React.PropTypes.number,
				'cash': React.PropTypes.number
	  		})
	  	),
		'actionData' : React.PropTypes.shape({
			'affectedLots': React.PropTypes.arrayOf(React.PropTypes.string),
			'cost': React.PropTypes.number
		})
	}
	,
	confirmAction: function(){
		this.props.confirmAction(
			this.props.actionType,
			{
				tileColor: this.state.tileColor
			}
		);
	},
	cancelAction: function(){
		this.props.cancelAction();
	},
	selectTileColor: function(event){
		this.setState({tileColor: event.target.value});	
	},
	checkFunds: function(){
		//if (this.props.actionData.cost > )
	},
	getInitialState: function(){
		return {
			tileColor: 'aqua'
		}
	},
	interpolateDescription: function(template, data){
		return eval(template);
	},
	render: function(){
		var className = classNames("card", "action", this.props.actionType, {'confirm' : this.props.tileSelected});
		var actionInfo = this.props.actionsDefaults.find(action => action.name == this.props.actionType);
		var cardDescription = '...'
		if (this.props.tileHovered || this.props.tileSelected){
			var lotId = this.props.tileHovered ? this.props.tileHovered : this.props.tileSelected;
			cardDescription= this.interpolateDescription(actionInfo.cardDescription, {...this.props.lotData, lotId});
		}
		var insufficientFunds = (<div><span className="insufficient-funds">Insufficient funds!</span>
				<button className="cancel-button" onClick={this.cancelAction}>Cancel</button></div>);
		var colorSelection = (<div>
			<span className="color-selection">
				Color:  <select value={this.state.tileColor} onChange={this.selectTileColor}>
						<option value="aqua">Aqua</option>
						<option value="brown">Brown</option>
						<option value="gold">Gold</option>
						<option value="purple">Purple</option>
						<option value="silver">Silver</option>
					</select></span>



				<button className="confirm-button" onClick={this.confirmAction}>Confirm</button>
				<button className="cancel-button" onClick={this.cancelAction}>Cancel</button>
			</div>);
		var playerCash = this.props.scores.find(playerScore => playerScore.color == this.props.activePlayer).cash;
		var standardContent = (
			<div className="card-content">
				<span className="card-title">{actionInfo.displayName}</span>
				<span className="card-description">
				{cardDescription}</span>

				{ this.props.tileSelected ? (playerCash >= this.props.lotData.buildCost ? colorSelection : insufficientFunds) : ''}
				
			</div>
			);
		var gambleContent = (
			
			<div className="card-content">
				<span className="gamble-numbers">
				<span className="double char1">2</span> 
				<span className="single char2">3</span>
				<span className="single char3">4</span>
				<span className="single char4">9</span>
				<span className="single char5">10</span>
				<span className="single char6">11</span>
				<span className="double char7">12</span>
			</span>
				<span className="card-title">GAMBLE</span>
				
				<span className="gamble-wager">Against: 
					<select>
						<option>Red</option>
						<option>Yellow</option>
						<option>Green</option>
						<option>Blue</option>
					</select>
				</span>
				<span className="gamble-wager">Amount: 
					<input type="range" min="1" max="20"/>
					<span className="gamble-amount">$15</span>
				</span>

				<span className="card-description">sdfsd</span>
			</div>
			);
		return (
			<div className={className} >
				<div className="card-background">
					<div className="color-overlay"></div>
					{this.props.actionType === 'gamble' ? gambleContent : standardContent}
					
				</div>
			</div>
		);
	}
});

module.exports = ActionCard;