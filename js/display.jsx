var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;

var actions = require('./actions');

var Display = React.createClass({
	render: function() {
		return (
			<div className="display">
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {
	};
};

module.exports = connect(mapStateToProps)(TopDisplay);