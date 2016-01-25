var classNames = require('classnames');
var TileStats = React.createClass({
	propTypes: {
		'casinosDefaults' : React.PropTypes.shape({
			'colors': React.PropTypes.arrayOf(React.PropTypes.string),
			'numTiles': React.PropTypes.number
		}),
		'casinos': React.PropTypes.arrayOf(React.PropTypes.shape({
	  		'casinoColor' : React.PropTypes.string,
			'lots' : React.PropTypes.arrayOf(React.PropTypes.string)
	  	})),
	},
	render: function(){
		var numTiles = this.props.casinosDefaults.numTiles;
		var usedTileCount = {};
		for (var i in this.props.casinosDefaults.colors){
			var color = this.props.casinosDefaults.colors[i];
			usedTileCount[color] = numTiles;
		}
		for (var j in this.props.casinos){
			var casino = this.props.casinos[j];
			usedTileCount[casino.casinoColor] -= casino.lots.length;
		}
		return (
			<div className='tiles clearfix'>
				<h2>TILES REMAINING (of {numTiles})</h2>
				{
					this.props.casinosDefaults.colors.map(function(color){
						return (
							<span className={'tile-marker ' + color}>
								<span className='remaining'>{usedTileCount[color]}</span>
							</span>
						);
					})
				}
			</div>
		);
	}
});

module.exports = TileStats;