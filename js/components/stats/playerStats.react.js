var classNames = require('classnames');
var PlayerStats = React.createClass({
	getInitialState: function(){
		return {
			cashIncrement: [0, 0, 0, 0]
		}
	},
	componentDidMount: function(){
		this._timer = setInterval(this.tick, 100);
	},
	componentWillReceiveProps: function(){
		this._timer = setInterval(this.tick, 100);
	},
	tick: function(){
		var cashIncrement = this.state.cashIncrement;
		var incrementingDone = this.props.scores.map(function(playerScore, i){
			if (playerScore.cash > cashIncrement[i]){
				cashIncrement[i]++;
				return false;
			}
			else if (playerScore.cash < cashIncrement[i]){
				cashIncrement[i]--;
				return false;
			}
			else{
				return true;
			}
		});
		if(incrementingDone.reduce((a, b)=> a && b)){
			clearInterval(this._timer);	
		}
		this.setState({
            cashIncrement
        });
	},
	render: function(){
		var activePlayer = this.props.activePlayer;
		var cashIncrement = this.state.cashIncrement;
		return (
			<div className="players clearfix">
				<h2>PLAYERS</h2>
				{this.props.scores.map(function(playerScore, i){
					var className = classNames(
						'player-marker',
						playerScore.color,
						{
							'active' : activePlayer == playerScore.color
						}
					);
					return (<span className={className}>
						<span className="amount">${cashIncrement[i]}</span>
						<span className="million">million</span>
					</span>);
				})}
			</div>
		);
	}
});

module.exports = PlayerStats;