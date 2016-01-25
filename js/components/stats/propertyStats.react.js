var classNames = require('classnames');
var PropertyStats = React.createClass({
	render: function(){
		
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
								<tr>
									<td>
										<span className="player-marker red">RED</span>
									</td>
									<td>
										<span className="lot-marker">3</span>
									</td>
									<td>
										<span className="tile-marker aqua">4</span>
										<span className="tile-marker brown">9</span>
										<span className="tile-marker gold">2</span>
										<span className="tile-marker purple">0</span>
										<span className="tile-marker silver">7</span>
									</td>
								</tr>
								<tr>
									<td>
										<span className="player-marker yellow">YELLOW</span>
									</td>
									<td>
										<span className="lot-marker">3</span>
									</td>
									<td>
										<span className="tile-marker aqua">4</span>
										<span className="tile-marker brown">9</span>
										<span className="tile-marker gold">2</span>
										<span className="tile-marker purple">0</span>
										<span className="tile-marker silver">7</span>
									</td>
								</tr>
								<tr>
									<td>
										<span className="player-marker green">GREEN</span>
									</td>
									<td>
											<span className="lot-marker">3</span>
									</td>
									<td>
										<span className="tile-marker aqua">4</span>
										<span className="tile-marker brown">9</span>
										<span className="tile-marker gold">2</span>
										<span className="tile-marker purple">0</span>
										<span className="tile-marker silver">7</span>
									</td>
								</tr>
								<tr>
									<td>
										<span className="player-marker blue">BLUE</span>
									</td>
									<td>
										<span className="lot-marker">3</span>
									</td>
									<td>
										<span className="tile-marker aqua">4</span>
										<span className="tile-marker brown">9</span>
										<span className="tile-marker gold">2</span>
										<span className="tile-marker purple">0</span>
										<span className="tile-marker silver">7</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
		);
	}
});

module.exports = PropertyStats;