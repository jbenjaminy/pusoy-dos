var React = require('react');
var connect = require('react-redux').connect;
var actions = require('./actions');
var Cards = require('./cards');

var Player = React.createClass({
	playCards: function() {
		console.log('hello');
	},

	showHand: function(hand) {
		var props = this.props;
		return function() {
			props.dispatch(actions.show(hand));
		}
	},

	render: function() {
		var cards = eval('this.props.' + this.props.hand);
		var classes = 'player ' + this.props.id;
		var nameClasses = 'name ';
		var submitButton;
		if (this.props.turn === this.props.name) {
			nameClasses += 'turn';
			submitButton = <button onClick={this.playCards}>Play Cards</button>;
		}

    return (
    	<div className={classes}>
    		<h3 className={nameClasses}>{this.props.name}</h3>
    		<Cards cards={cards} handNum={this.props.hand} test={this.props.state} />
    		<button onClick={this.showHand(this.props.hand)}>View Cards</button>
				<div>{submitButton}</div>
	    </div>
    );
	}
});

var mapStateToProps = function(state, props) {
	return {
		state: state,
		handOne: state.showHandOne,
		handTwo: state.showHandTwo,
		handThree: state.showHandThree,
		handFour: state.showHandFour,
		turn: state.turn
	};
};

module.exports = connect(mapStateToProps)(Player);
