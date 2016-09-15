var React = require('react');
var connect = require('react-redux').connect;
var actions = require('./actions');

var Cards = React.createClass({
	render: function() {
		return (
			<li
				key={this.props.card.code}
				onClick={() => this.props.selectCard(this.props.card.code, this.props.handNum)}
			>
				<img
					className={this.props.classList}
					src={this.props.card.image}
					height='80px'
					width='57px'
				/>
			</li>
		);
	}
});

var Container = connect()(Cards);

module.exports = Container;
