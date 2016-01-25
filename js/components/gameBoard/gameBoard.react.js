var GameBoardRegion = require('./gameBoardRegion.react');

var GameBoard = React.createClass({
	render: function() {
		var lotRegions = this.props.gameBoardDefaults.lotRegions;
		var lots = this.props.gameBoardDefaults.lots;
		var lotTypes = this.props.gameBoardDefaults.lotTypes;
		var rightChildren = [];
		var leftChildren = [];
		for(var i=0; i < lotRegions.length; i++){
			var region = lotRegions[i];
			var newRegionComponent = (<GameBoardRegion
										selectTile={this.props.selectTile}
										hoverOnTile={this.props.hoverOnTile}
										hoverOffTile={this.props.hoverOffTile}
										key={i}
										regionId={region.id}
										numLots={region.numLots}
										lots={lots}
										lotTypes={lotTypes}
										ownedLots={this.props.ownedLots}/>);
			if (i % 2 === 0){
				rightChildren.push(newRegionComponent);
			}
			else {
				leftChildren.push(newRegionComponent);
			}
		}
		return (
			<div className="gameBoard clearfix" >
				<div className="rightChildren">
					{rightChildren}
				</div>
				<div className="theStrip">
					<span className="label1">THE STRIP</span>
					<span className="label2">THE STRIP</span>
				</div>
				<div className="leftChildren">
					{leftChildren}
				</div>
			</div>
		);
	}
});

module.exports = GameBoard;