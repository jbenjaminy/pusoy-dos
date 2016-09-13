var actions = require('./actions');

var reducers = function(state, action) {
    state = state || {};

    if (action.type === actions.START_GAME) {
    	// if no 'dealer' in state, sets player one as dealer, otherwise advances to next player as dealer
    	var dealer = 1;
    	if (state.dealer) {
    		if (state.dealer < 4) {
    			dealer = state.dealer + 1;
    		}
    	}

        return Object.assign({}, { 
        	inGame: true,
        	hands: [],
        	dealer: dealer,

        });
    } else if (action.type === actions.SHUFFLE_SUCCESS) {
    	var dealer = state.dealer;
    	var hands = action.hands;
    	var handOne = [];
    	var handTwo = [];
    	var handThree = [];
    	var handFour = [];
    	// distributes hands clockwise from player representing 'dealer'
    	if (dealer === 1) {
    		handOne = hands[3];
    		handTwo = hands[0];
    		handThree = hands[1];
    		handFour = hands[2];
    	} else if (dealer === 2) {
    		handOne = hands[2];
    		handTwo = hands[3];
    		handThree = hands[0];
    		handFour = hands [1];
    	} else if (dealer === 3) {
    		handOne = hands[1];
    		handTwo = hands[2];
    		handThree = hands[3];
    		handFour = hands[0];
    	} else if (dealer === 4) {
    		handOne = hands[0];
    		handTwo = hands[1];
    		handThree = hands[2];
    		handFour = hands[3];
    	}
    	return Object.assign({}, state, {
    		hands: hands,
    		handOne: handOne,
    		handTwo: handTwo,
    		handThree: handThree,
    		handFour: handFour,
    	});
    } else if (action.type === actions.SHUFFLE_ERROR) {
        return state;
    } else {
    	return state;
    }
};

module.exports = reducers;