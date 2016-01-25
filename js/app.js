var ReactDOM = require('react-dom');
var { createStore } = require('redux');
var { Provider } = require('react-redux');
var Reducer = require('./reducers/reducer');

var classNames = require('classnames');
var LordsOfVegasApp = require('./components/LordsOfVegasApp.react');
var data = require('./data');

var store = createStore(Reducer, data.defaults.state);

ReactDOM.render(
	<Provider store={store}>
		<LordsOfVegasApp
	    gameBoardDefaults={data.defaults.board}
	    cardsDefaults={data.defaults.cards}
	    actionsDefaults={data.defaults.actions}
	    casinosDefaults={data.defaults.casinos}
	    gameState={data.defaults.state} />
	</Provider>,
	document.getElementById('container')
);