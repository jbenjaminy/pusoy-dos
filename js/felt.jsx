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
			return <button onClick={this.shuffle}>Start Game</button>;	
		} 

		if (this.props.hands.length === 0) {
			return null;
		}
		return (
			<div className="felt">
				<Player className='player-one' id='1' cards={this.props.handOne}/>
				<Player className='player-two' id='2' cards={this.props.handTwo}/>
				<Player className='player-three' id='3' cards={this.props.handThree}/>
				<Player className='player-four' id='4' cards={this.props.cards.handFour}/>
				<div className='board'></div>
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {
		inGame: state.inGame,
		handOne: state.handOne,
		handTwo: state.handTwo,
		handThree: state.handThree,
		handFour: state.handFour
	};
};

module.exports = connect(mapStateToProps)(Felt);