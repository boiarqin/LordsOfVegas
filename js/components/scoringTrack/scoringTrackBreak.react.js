var ScoringTrackMarker = require('./scoringTrackMarker.react');

var ScoringTrackBreak = React.createClass({
	render: function() {
		return (
			<li className="scoringTrackBreak" >
				{
					this.props.markers.map(function(marker, i){
						return <ScoringTrackMarker key={i} position={i} marker={marker} />;
					
				})}
				{
				/*horizontal bar*/}
				{this.props.breakNumber}
			</li>
		);
	}
});

module.exports = ScoringTrackBreak;