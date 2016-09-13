var fetch = require('isomorphic-fetch');

// sets initial state for each game; increments the dealer for the game
var START_GAME = 'START_GAME';
var startGame = function() {
    return {
        type: START_GAME
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
        .then(function(hands) {
            return dispatch(
                shuffleSuccess(hands)
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
var shuffleSuccess = function(hands) {
    return {
        type: SHUFFLE_SUCCESS,
        hands: hands
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

exports.shuffle = shuffle;
exports.SHUFFLE_SUCCESS = SHUFFLE_SUCCESS;
exports.shuffleSuccess = shuffleSuccess;
exports.SHUFFLE_ERROR = SHUFFLE_ERROR;
exports.shuffleError = shuffleError;