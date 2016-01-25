var classNames = require('classnames');

var GambleContent = React.createClass({
	
	render: function(){
		return (
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
	}
});

module.exports = GambleContent;