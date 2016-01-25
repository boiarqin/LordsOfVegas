var GameBoardTile = require('./gameBoardTile.react');

var GameBoardRegion = React.createClass({
	propTypes: {
		'ownedLots' : React.PropTypes.object,
		'lotTypes' : React.PropTypes.object,
		'regionId' : React.PropTypes.string, 
		'numLots' : React.PropTypes.number,
		'selectTile' : React.PropTypes.func,
		'hoverOnTile' : React.PropTypes.func,
		'hoverOffTile' : React.PropTypes.func

	},
	render: function() {
		var children = [];
		for(var i=0; i<this.props.numLots; i++){
			var lotId = this.props.regionId + (i+1);
			var lotType = this.props.lots[lotId];
			var ownedLots = this.props.ownedLots;

			var isOwned = Boolean(ownedLots[lotId]);
			var isBuilt = isOwned ? ownedLots[lotId].isBuilt : false;
			var dieValue = isOwned ? ownedLots[lotId].dieValue : this.props.lotTypes[lotType].dieValue;
			var buildCost = isBuilt ? null : this.props.lotTypes[lotType].buildCost;
			var playerColor = isOwned ? ownedLots[lotId].playerColor : null;
			var casinoColor = isOwned ? ownedLots[lotId].casinoColor : null;

			_(this.props.ownedLots)

			children.push(<GameBoardTile
				selectTile={this.props.selectTile}
				hoverOnTile={this.props.hoverOnTile}
				hoverOffTile={this.props.hoverOffTile}
				lotData={{lotId, dieValue, buildCost, casinoColor, playerColor, isBuilt, isOwned}}/>);
		}
		return (
			<div className="gameBoardRegion clearfix">
				{children}
			</div>
		);
	}
});

module.exports = GameBoardRegion;