var React = require('react');

var Cards = React.createClass({
	selectCard: function() {
		console.log('hello');
		// var props = this.props;
		// if (code != 'back') {
		// 	return function() {
		// 		props.dispatch(actions.select(code, hand));
		// 	}
		// }
	},
	render: function() {
	 	if (!this.props.cards) {
	 		return null
	 	} else {
				var cards = this.props.cards.map(function(card) {
	 			// if (!card.selected) {
	 				// return <li key={card.code}><img className='card selected' src={card.image} height='80px' width='57px'></img></li>
 				// } else {
	 			return <li key={card.code} onClick={() => this.selectCard()}><img className='card' src={card.image} height='80px' width='57px'></img></li>
	 			// }
			}, this);

			// var cards = [];
			// this.props.cards.forEach(function(card) {
			// 	cards.push(<li key={card.code} onClick={() => this.selectCard()}><img className='card' src={card.image} height='80px' width='57px'></img></li>);
			// }, this);
	 	}
    return (
    	<ul>
    		{cards}
	    </ul>
    );
	}
});

//
//	selectCard: function(code, hand) {
//onClick={this.selectCard(card.code, this.props.hand)}

module.exports = Cards;
