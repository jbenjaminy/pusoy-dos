var React = require('react');
var connect = require('react-redux').connect;
var actions = require('./actions');
var Player = require('./player');
var LastCards = require('./last-cards');


var Felt = React.createClass({
	shuffleCards: function() {
		this.props.dispatch(actions.startGame());
		this.props.dispatch(actions.shuffle());
	},
	render: function() {
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
		console.log('state', this.props.state);

		var boardClasses = 'board ';
		if (this.props.turn === 'handTwo') {
			boardClasses += 'shift';
		}

		var lastMove = [];
		if (this.props.prevMove) {
			this.props.prevMove.cards.forEach(function(card, idx) {
				lastMove.push(
					<LastCards
				  	card={card}
					 	classList={'card'}
						key={idx}
					/>
				);
			});
		}

		return (
			<div className='felt'>
				<Player id='player-three' name='Player Three' hand='handThree' test={this.props.state} />
				<div className='mid'>
					<Player id='player-two item' name='Player Two' hand='handTwo' test={this.props.state} /><ul className={boardClasses}>{lastMove}</ul><Player id='player-four item' name='Player Four' hand='handFour' test={this.props.state} />				
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
		handFour: state.handFour,
		prevMove: state.prevMove,
		turn: state.turn
	};
};

module.exports = connect(mapStateToProps)(Felt);
