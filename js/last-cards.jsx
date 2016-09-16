var React = require('react');
var connect = require('react-redux').connect;
var actions = require('./actions');

function LastCards(props) {
  return (
    <li key={props.card.code}>
      <img
        className={props.classList}
        src={props.card.image}
        height='80px'
        width='57px'
      />
    </li>
  );
}

module.exports = LastCards;
