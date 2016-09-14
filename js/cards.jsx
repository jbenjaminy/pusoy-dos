// onClick={this.selectCard(card.code, this.props.hand)}
var React = require('react');

var Cards = React.createClass({
	selectCard: function(code, hand) {
		var props = this.props;
		if (code != 'back') {
			return function() {
				props.dispatch(actions.select(code, hand));
			}
		}
	},
	 render: function() {
	 	if (!this.props.cards) {
	 		return null
	 	} else { 
	 		var cards = this.props.cards.map(function(card) {
	 			// if (!card.selected) {
	 				// return <li key={card.code}><img className='card selected' src={card.image} height='80px' width='57px'></img></li>
 				// } else {
	 			return <li key={card.code}><img className='card' src={card.image} height='80px' width='57px'></img></li>
	 			// }
	 		});
	 	}
	    return (
	    	<ul>
	    		{cards}
		    </ul>
	    );
  	}
});

module.exports = Cards;