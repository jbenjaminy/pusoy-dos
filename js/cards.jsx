var React = require('react');
var connect = require('react-redux').connect;
var actions = require('./actions');

var Cards = React.createClass({
	selectCard: function(code, hand) {
		if (code != 'back') {
			this.props.dispatch(actions.select(code, hand));
		}
	},
	render: function() {
		console.log('asdfao');
	 	if (!this.props.cards) {
	 		return null
	 	} else {
			var cards = this.props.cards.map(function(card) {
				//card.selected doesn't exist
				console.log(card.selected);
				var classList = card.selected ? 'card selected' : 'card';
	 			return (
					<li key={card.code} onClick={() => this.selectCard(card.code, this.props.handNum)}>
						<img className={classList} src={card.image} height='80px' width='57px' />
					</li>
				);
			}, this);
	 	}
    return (
    	<ul>
    		{cards}
	    </ul>
    );
	}
});

var Container = connect()(Cards);

module.exports = Container;
