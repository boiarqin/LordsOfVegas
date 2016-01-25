var ScoringTrackBreak = require('./scoringTrackBreak.react');

var ScoringTrack = React.createClass({
	render: function() {
		var scores = this.props.scores;
		return (
			<ul className="scoringTrack" >
				{this.props.scoringTrackDefaults.map(function(breakNumber, i){
					var markers = _.chain(scores).where({'score':breakNumber}).pluck('color').value();

					return <ScoringTrackBreak key={i} breakNumber={breakNumber} markers={markers} />;
				})}
			</ul>
		);
	}
});

module.exports = ScoringTrack;