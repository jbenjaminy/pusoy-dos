var React = require('react');
var Display = require('./display');
var Felt = require('./felt');

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