var classNames = require('classnames');
var Card = React.createClass({
	render: function(){
		var className = classNames("card", this.props.cardState.color, {'game-over' : this.props.endOfGame});
		var description = this.props.cardsDefaults.descriptions[this.props.cardState.color];
		return (
			<div className={className} >
				<div className="card-background">
					<div className="color-overlay"></div>
					<div className="card-content">
						<span className="card-title">{this.props.cardState.lotId}</span>
						<span className="card-description">{description}</span>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Card;