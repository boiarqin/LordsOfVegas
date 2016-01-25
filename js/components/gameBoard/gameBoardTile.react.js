var classNames = require('classnames');

var GameBoardTile = React.createClass({
	propTypes: {
		'lotData' : React.PropTypes.shape({
			'lotId' : React.PropTypes.string,
			'buildCost' : React.PropTypes.number,
			'dieValue' : React.PropTypes.number,
			'casinoColor' : React.PropTypes.string,
			'playerColor' : React.PropTypes.string,
			'isOwned' : React.PropTypes.bool,
			'isBuilt' : React.PropTypes.bool
		}),
		'selectTile' : React.PropTypes.func,
		'hoverOnTile' : React.PropTypes.func,
		'hoverOffTile' : React.PropTypes.func
	},
	handleClick: function(lotId){
		this.props.selectTile(lotId);
	},
	handleMouseEnter: function(lotId){
		this.props.hoverOnTile(lotId);
	},
	handleMouseLeave: function(lotId){
		this.props.hoverOffTile(lotId);
	},
	render: function() {
		var lotData = this.props.lotData;
		var className = classNames(
			'gameBoardTile',
			lotData.casinoColor,
			lotData.playerColor,
			{
				'built' : lotData.isBuilt,
				'owned' : lotData.isBuilt ? '' : lotData.isOwned
			});
		var buildCostSpan = lotData.isBuilt ? null : (<span className="buildCost">${lotData.buildCost}</span>);
		return (
			<div
				className={className}
				onClick={this.handleClick.bind(null, lotData.lotId)}
				onMouseEnter={this.handleMouseEnter.bind(null, lotData.lotId)}
				onMouseLeave={this.handleMouseLeave.bind(null, lotData.lotId)}>
				<span className="lotId">{lotData.lotId}</span>
				<div className={"dieValue dieValue-"+lotData.dieValue}>
					<span className="dot"></span>
				</div>
				{buildCostSpan}
			</div>
		);
	}
});

module.exports = GameBoardTile;