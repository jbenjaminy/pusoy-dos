var React = require('react');
var connect = require('react-redux').connect;
var actions = require('./actions');
var Player = require('./player');


var Felt = React.createClass({
	shuffleCards: function() {
		this.props.dispatch(actions.startGame());
		this.props.dispatch(actions.shuffle());
	},
	render: function() {
		console.log(this.props.state);
		if (!this.props.inGame) {
			return (
				<div className='felt'>
					<button className='start' onClick={this.shuffleCards}>Start Game</button>
				</div>
			);
		}
		if (this.props.inGame && this.props.hands.length === 0) {
			return (
				<div className='felt'>
				</div>
			);
		}
		console.log('end of felt');
		return (
			<div className='felt'>
				<Player id='player-three' name='Player Three' hand='handThree' test={this.props.state} />
				<div className='mid'>
					<Player id='player-two' name='Player Two' hand='handTwo' test={this.props.state} />
					<div className='board'></div>
					<Player id='player-four' name='Player Four' hand='handFour' test={this.props.state} />
				</div>
				<Player id='player-one' name='Player One' hand='handOne' test={this.props.state} />
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {
		state: state,
		inGame: state.inGame,
		hands: state.hands,
		handOne: state.handOne,
		handTwo: state.handTwo,
		handThree: state.handThree,
		handFour: state.handFour
	};
};

module.exports = connect(mapStateToProps)(Felt);
