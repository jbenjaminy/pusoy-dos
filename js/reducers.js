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
            players: {
                one: {name: 'Player One'},
                two: {name: 'Player Two'},
                three: {name: 'Player Three'},
                four: {name: 'Player Four'}
            },
        });
    } else if (action.type === actions.SHOW) {
        var showHandOne = state.showHandOne;
        var showHandTwo = state.showHandTwo;
        var showHandThree = state.showHandThree;
        var showHandFour = state.showHandFour;
        if (action.hand === 'handOne') {
            if (showHandOne.length === 1) {
                showHandOne = state.handOne.slice();
            } else {
                showHandOne = [];
            }
            showHandOne.push({code: 'back', image: 'card-back-blue.png'});
        } else if (action.hand === 'handTwo') {
            if (showHandTwo.length === 1) {
                showHandTwo = state.handTwo.slice();
            } else {
                showHandTwo = [];
            }
            showHandTwo.push({code: 'back', image: 'card-back-blue.png'});
        } else if (action.hand === 'handThree') {
            if (showHandThree.length === 1) {
                showHandThree = state.handThree.slice();
            } else {
                showHandThree = [];
            }
            showHandThree.push({code: 'back', image: 'card-back-blue.png'});
        } else if (action.hand === 'handFour') {
            if (showHandFour.length === 1) {
                showHandFour = state.handFour.slice();
            } else {
                showHandFour = [];
            }
            showHandFour.push({code: 'back', image: 'card-back-blue.png'});
        }
        return Object.assign({}, state, {
            showHandOne: showHandOne,
            showHandTwo: showHandTwo,
            showHandThree: showHandThree,
            showHandFour: showHandFour,

        });
    } else if (action.type === actions.SELECT) {
        var handOne = state.handOne;
        var handTwo = state.handTwo;
        var handThree = state.handThree;
        var handFour = state.handFour;
        var updatedHand = state[action.hand].slice();
        var selectedArr = state.selected.slice();
        updatedHand.forEach(function(card, index){
            if (action.code === card.code) {
                if (card.selected === false) {
                    card.selected = true;
                    selectedArr.push(card);
                } else {
                    card.selected = false;
                    selectedArr.splice(selectedArr.indexOf(card), 1);
                }
            }
        });
        if (action.hand === 'handOne') {
            handOne = updatedHand;
        } else if (action.hand === 'handTwo') {
            handTwo = updatedHand;
        } else if (action.hand === 'handThree') {
            handThree = updatedHand;
        } else if (action.hand === 'handFour') {
            handFour = updatedHand;
        }

        return Object.assign({}, state, {
            handOne: handOne,
            handTwo: handTwo,
            handThree: handThree,
            handFour: handFour,
            selected: selectedArr,
        });
    } else if (action.type === actions.PLAY_CARDS) {

    } else if (action.type === actions.SHUFFLE_SUCCESS) {
    	var dealer = state.dealer;
    	var hands = action.hands;
    	var handOne = [];
    	var handTwo = [];
    	var handThree = [];
    	var handFour = [];
        var firstMove = action.firstMove;
        var turn = '';
    	// distributes hands clockwise from player representing 'dealer'
    	if (dealer === 1) {
    		handOne = hands[3];
    		handTwo = hands[0];
    		handThree = hands[1];
    		handFour = hands[2];
            if (firstMove === 0) {
                turn = 'Player Two';
            } else if (firstMove === 1) {
                turn = 'Player Three';
            } else if (firstMove === 2) {
                turn = 'Player Four';
            } else if (firstMove === 3) {
                turn = 'Player One';
            }
    	} else if (dealer === 2) {
    		handOne = hands[2];
    		handTwo = hands[3];
    		handThree = hands[0];
    		handFour = hands[1];
            if (firstMove === 0) {
                turn = 'Player Three';
            } else if (firstMove === 1) {
                turn = 'Player Four';
            } else if (firstMove === 2) {
                turn = 'Player One';
            } else if (firstMove === 3) {
                turn = 'Player Two';
            }
    	} else if (dealer === 3) {
    		handOne = hands[1];
    		handTwo = hands[2];
    		handThree = hands[3];
    		handFour = hands[0];
            if (firstMove === 0) {
                turn = 'Player Four';
            } else if (firstMove === 1) {
                turn = 'Player One';
            } else if (firstMove === 2) {
                turn = 'Player Two';
            } else if (firstMove === 3) {
                turn = 'Player Three';
            }
    	} else if (dealer === 4) {
    		handOne = hands[0];
    		handTwo = hands[1];
    		handThree = hands[2];
    		handFour = hands[3];
            if (firstMove === 0) {
                turn = 'Player One';
            } else if (firstMove === 1) {
                turn = 'Player Two';
            } else if (firstMove === 2) {
                turn = 'Player Three';
            } else if (firstMove === 3) {
                turn = 'Player Four';
            }
    	}
    	return Object.assign({}, state, {
    		hands: hands,
    		handOne: handOne,
    		handTwo: handTwo,
    		handThree: handThree,
    		handFour: handFour,
            selected: [],
            showHandOne: [{code: 'back', image: 'card-back-blue.png'}],
            showHandTwo: [{code: 'back', image: 'card-back-blue.png'}],
            showHandThree: [{code: 'back', image: 'card-back-blue.png'}],
            showHandFour: [{code: 'back', image: 'card-back-blue.png'}],
            turn: turn,
    	});
    } else if (action.type === actions.SHUFFLE_ERROR) {
        return state;
    } else {
    	return state;
    }
};

module.exports = reducers;
