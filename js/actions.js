var fetch = require('isomorphic-fetch');

// sets initial state for each game; increments the dealer for the game
var START_GAME = 'START_GAME';
var startGame = function() {
    return {
        type: START_GAME
    };
};

// opens/closes players hand to see cards;
var SHOW = 'SHOW';
var show = function(hand) {
	return {
		type: SHOW,
		hand: hand
	};
};

// select/unselect card from hand;
var SELECT = 'SELECT';
var select = function(code, hand) {
	return {
		type: SELECT,
		code: code,
		hand: hand
	};
};

var PLAY_CARDS = 'PLAY_CARDS';
var playCards = function(cards) {
    return {
        type: PLAY_CARDS,
        cards: cards
    };
};

// makes call to DECK OF CARDS API for deck to be shuffled; sets rankings for returned array of cards and 'deals' cards, separating them into four hands
var shuffle = function() {
    return function(dispatch) {
        var url = '/shuffle';
        var request = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };
        return fetch(url, request)
        .then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
            return response;
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
        	console.log('data', data);
        	var hands = data.hands;
        	var firstMove = data.firstMove;
            return dispatch(
                shuffleSuccess(hands, firstMove)
            );
        })
        .catch(function(error) {
            return dispatch(
                shuffleError(error)
            );
        });
    }
};

// passes 'hands' array of four arrays containing each player's 'hand' for a single game
var SHUFFLE_SUCCESS = 'SHUFFLE_SUCCESS';
var shuffleSuccess = function(hands, firstMove) {
    return {
        type: SHUFFLE_SUCCESS,
        hands: hands,
        firstMove: firstMove
    };
};

var SHUFFLE_ERROR = 'SHUFFLE_ERROR';
var shuffleError = function(error) {
    return {
        type: SHUFFLE_ERROR,
        error: error
    };
};

/*----------- EXPORTS ----------*/
exports.START_GAME = START_GAME;
exports.startGame = startGame;

exports.SHOW = SHOW;
exports.show = show;

exports.SELECT = SELECT;
exports.select = select;

exports.PLAY_CARDS = PLAY_CARDS;
exports.playCards = playCards;

exports.shuffle = shuffle;
exports.SHUFFLE_SUCCESS = SHUFFLE_SUCCESS;
exports.shuffleSuccess = shuffleSuccess;
exports.SHUFFLE_ERROR = SHUFFLE_ERROR;
exports.shuffleError = shuffleError;
