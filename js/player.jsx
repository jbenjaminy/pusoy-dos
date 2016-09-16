var React = require('react');
var connect = require('react-redux').connect;
var actions = require('./actions');
var Cards = require('./cards');

var Player = React.createClass({
	playCards: function() {
		this.props.dispatch(actions.playCards(this.props.selected));
	},

	passTurn: function() {
		this.props.dispatch(actions.passTurn());
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
		var currentHand = this.props.hand.split('');
		currentHand.shift();
		currentHand.unshift('H');
		var currentHand = currentHand.join('');

		var classes = 'player ' + this.props.id;
		var nameClasses = this.props.turn === this.props.hand ? 'name turn' : 'name';
		var submitButton = this.props.turn === this.props.hand ? <button onClick={this.playCards}>Play Cards</button> : '';
		var passButton = this.props.turn === this.props.hand ? <button onClick={this.passTurn}>Pass Turn</button> : '';

		var cards = eval(`this.props.${this.props.hand}`);

		var showHand = eval(`this.props.show${currentHand}`);

		if (!showHand) {
			var cardsArr = (
				<Cards
			  	card={{code: 'back', image: 'card-back-blue.png'}}
				 	classList={'card'}
				 	handNum={this.props.hand}
					selectCard={this.selectCard}
					key={1}
				/>
			);
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
				<div>{passButton}</div>
	    </div>
    );
	}
});

var mapStateToProps = function(state, props) {
	return {
		state: state,
		showHandOne: state.showHandOne,
		showHandTwo: state.showHandTwo,
		showHandThree: state.showHandThree,
		showHandFour: state.showHandFour,
		handOne: state.handOne,
		handTwo: state.handTwo,
		handThree: state.handThree,
		handFour: state.handFour,
		turn: state.turn,
		selected: state.selected,
	};
};

module.exports = connect(mapStateToProps)(Player);
