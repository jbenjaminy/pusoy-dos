var React = require('react');
var TopDisplay = require('./display');
var Board = require('./felt');

var GameContainer = React.createClass({
	 render: function() {
	    return (
	    	<div className='game-container'>
		    	<Display />
		    	<Felt />
		    </div>
	    );
  	}
});

module.exports = GameContainer;