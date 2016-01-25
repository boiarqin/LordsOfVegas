var {selectAction} = require('../actionCreators/actionCreators');
var classNames = require('classnames');
var store = {};

var PlayerActions = React.createClass({
	handleActionButton: function(actionType){
		//var actionType = e.target.getAttribute('id').split('action-')[1];
		this.props.handleActionButton(actionType);
	},
	render: function(){
		var handleActionButton = this.handleActionButton;
		var endOfGame = this.props.endOfGame;
		return (
			<div className="player-actions">
				<table>
					<thead>
						<tr>
							<th>Action</th>
							<th>Description</th>
							<th>Cost</th>
						</tr>
					</thead>
					<tbody>
						{this.props.actionsDefaults.map(function(action, i){
							return (<tr>
								<td>
									<button id={"action-"+action.name} onClick={handleActionButton.bind(null, action.name)} disabled={endOfGame}>
										{action.displayName}
									</button>
								</td>
								<td className="description">{action.description}</td>
								<td className="cost">{action.cost}</td>
							</tr>);
						})}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = PlayerActions;