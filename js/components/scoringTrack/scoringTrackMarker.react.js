var ScoringTrackMarker = React.createClass({
	render: function() {
		return (
			<span className={"scoringTrackMarker " + this.props.marker} style={{left: (this.props.position*3+1)+"px" }}>
				<span className="arrow"></span>
			</span>
		);
	}
});

module.exports = ScoringTrackMarker;