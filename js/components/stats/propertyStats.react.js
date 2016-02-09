var classNames = require('classnames');
var PropertyStats = React.createClass({
	propTypes: {
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
	},
	render: function(){
		var ownedLots = this.props.ownedLots;
		var stats = {
			'red' : {
				'empty': 0,
				'aqua' : 0,
				'brown' : 0,
				'gold' : 0,
				'purple' : 0,
				'silver' : 0
			},
			'yellow' : {
				'empty': 0,
				'aqua' : 0,
				'brown' : 0,
				'gold' : 0,
				'purple' : 0,
				'silver' : 0
			},
			'blue' : {
				'empty': 0,
				'aqua' : 0,
				'brown' : 0,
				'gold' : 0,
				'purple' : 0,
				'silver' : 0
			},
			'green' : {
				'empty': 0,
				'aqua' : 0,
				'brown' : 0,
				'gold' : 0,
				'purple' : 0,
				'silver' : 0
			}
		}
		for (var i in ownedLots){
			var lot = ownedLots[i];
			if (!lot.isBuilt){
				stats[lot.playerColor].empty += 1
			}
		}
		for (var j in this.props.casinos){
			var casino = this.props.casinos[j];
			
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
			
			stats[boss][casino.casinoColor] += lots.length;
		}

		return (
			<div className="properties clearfix">
						<table>
							<thead>
								<tr>
									<th>Player</th>
									<th>Lots</th>
									<th>Casino Pts</th>
								</tr>
							</thead>
							<tbody>
								{this.props.scores.map(playerScore=>{
									return (
										<tr>
											<td>
												<span className="player-marker {playerScore.color}">{playerScore.color}</span>
											</td>
											<td>
												<span className="lot-marker">{stats[playerScore.color].empty}</span>
											</td>
											<td>
												<span className="tile-marker aqua">{stats[playerScore.color].aqua}</span>
												<span className="tile-marker brown">{stats[playerScore.color].brown}</span>
												<span className="tile-marker gold">{stats[playerScore.color].gold}</span>
												<span className="tile-marker purple">{stats[playerScore.color].purple}</span>
												<span className="tile-marker silver">{stats[playerScore.color].silver}</span>
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
		);
	}
});

module.exports = PropertyStats;