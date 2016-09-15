var React = require('react');
var connect = require('react-redux').connect;
var actions = require('./actions');
var Cards = require('./cards');

var Player = React.createClass({
	playCards: function() {
		this.props.dispatch(actions.playCards(this.props.selected));
	},

	passTurn: function() {
		// should have a counter of number of passes in a row
	},

	showHand: function(hand) {
		var props = this.props;
		return function() {
			props.dispatch(actions.show(hand));
		}
	},

	selectCard: function(code, hand) {
		if (code != 'back') {
			this.props.dispatch(actions.select(code, hand));
		}
	},

	render: function() {
		var classes = 'player ' + this.props.id;
		var nameClasses = 'name ';
		var submitButton;
		if (this.props.turn === this.props.hand) {
			nameClasses += 'turn';
			submitButton = <button onClick={this.playCards}>Play Cards</button>;
		}

		var cards = eval('this.props.' + this.props.hand);
		console.log(cards, 'cards');

		if (!cards) {
			return null;
		} else {
			var cardsArr = cards.map(function(card, idx) {
				var classList = card.selected ? 'card selected' : 'card';
				return (
					<Cards
						card={card}
						classList={classList}
						handNum={this.props.hand}
						selectCard={this.selectCard}
						key={idx}
					/>
				);
			}, this);
		}

    return (
    	<div className={classes}>
    		<h3 className={nameClasses}>{this.props.name}</h3>
    		<ul>{cardsArr}</ul>
    		<button onClick={this.showHand(this.props.hand)}>View Cards</button>
				<div>{submitButton}</div>
	    </div>
    );
	}
});

var mapStateToProps = function(state, props) {
	return {
		state: state,
		handOne: state.handOne,
		handTwo: state.showHandTwo,
		handThree: state.showHandThree,
		handFour: state.showHandFour,
		turn: state.turn,
		selected: state.selected,
	};
};

module.exports = connect(mapStateToProps)(Player);
