var React = require('react');
var connect = require('react-redux').connect;
var actions = require('./actions');

var Display = React.createClass({
	render: function() {
		if (!this.props.inGame || this.props.hands.length === 0) {
			return (
				<div className='display'>
					<h1 className='title'>PUSOY DOS</h1>
				</div>
			);
		}
		return (
			<div className='display'>
				<h1 className='title'>PUSOY DOS</h1>
				<div className='players'>
					<div className='col one'>
						<h3>Player One</h3>
						<h4>Cards Remaining: &nbsp;&nbsp;{this.props.handOne.length}</h4>
						<h4>Games Won: &nbsp;&nbsp;</h4>
					</div>
					<div className='col two'>
						<h3>Player Two</h3>
						<h4>Cards Remaining: &nbsp;&nbsp;{this.props.handTwo.length}</h4>						
						<h4>Games Won: &nbsp;&nbsp;</h4>
					</div>
					<div className='col three'>
						<h3>Player Three</h3>
						<h4>Cards Remaining: &nbsp;&nbsp;{this.props.handThree.length}</h4>						
						<h4>Games Won: &nbsp;&nbsp;</h4>
					</div>
					<div className='col four'>
						<h3>Player Four</h3>
						<h4>Cards Remaining: &nbsp;&nbsp;{this.props.handFour.length}</h4>					
						<h4>Games Won: &nbsp;&nbsp;</h4>
					</div>
				</div>
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {
		inGame: state.inGame,
		hands: state.hands,
		handOne: state.handOne,
		handTwo: state.handTwo,
		handThree: state.handThree,
		handFour: state.handFour
	};
};

module.exports = connect(mapStateToProps)(Display);