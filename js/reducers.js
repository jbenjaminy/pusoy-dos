var actions = require('./actions');

function isHandValid(hand) {
    var cardNum = hand.length;

    if (cardNum < 1 || cardNum === 4 || cardNum > 5) {
        return false;
    }

    if (cardNum === 2 || cardNum === 3) {
        var value = hand[0].value;
        var testHand = hand.filter(function(card) {
            return card.value === value;
        });

        if (testHand.length === hand.length) {
            return true;
        }

        return false;
    }

    if (cardNum === 5) {
        var isStraight;
        var isFlush;
        var isFullHouse;
        var isStraightFlush;

        var values = [];
        hand.forEach(function(card) {
            if (card.value === 'JACK') {
                var value = 11;
            } else if (card.value === 'QUEEN') {
                value = 12;
            } else if (card.value === 'KING') {
                value = 13;
            } else if (card.value === 'ACE') {
                value = 14;
            } else {
                value = card.value;
            }
            
            values.push(value);
        });

        values.sort(function(a, b) {
            return a > b;
        });
    }

    if (!state.prevMove && hand.length ) {
        playedHand = hand;
    } else if (hand.length !== state.prevMove.length) {
        return state;
    } else {
        if (hand.length === 1 && hand[0].rank > state.prevMove[0].rank) {
            playedHand = hand;
        } else if (hand.length === 2 && hand[0].value === action.cards[1].value) {
            console.log('double');
        }
    }
}

var reducers = function(state, action) {
    state = state || {};
    var handOne = state.handOne;
    var handTwo = state.handTwo;
    var handThree = state.handThree;
    var handFour = state.handFour;

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
            showHandOne = !state.showHandOne;
        } else if (action.hand === 'handTwo') {
            showHandTwo = !state.showHandTwo;
        } else if (action.hand === 'handThree') {
            showHandThree = !state.showHandThree;
        } else if (action.hand === 'handFour') {
            showHandFour = !state.showHandFour;
        }
        return Object.assign({}, state, {
            showHandOne: showHandOne,
            showHandTwo: showHandTwo,
            showHandThree: showHandThree,
            showHandFour: showHandFour,
        });
    } else if (action.type === actions.SELECT) {
        var updatedHand = state[action.hand].slice();
        var selectedArr = state.selected.slice();
        updatedHand.forEach(function(card, index){
            if (action.code === card.code) {
                if (!card.selected) {
                    card.selected = true;
                } else {
                    card.selected = false;
                }

                if (action.hand === state.turn) {
                    if (!card.selected) {
                        selectedArr.splice(selectedArr.indexOf(card), 1);
                    } else {
                        selectedArr.push(card);
                    }
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
        console.log(selectedArr);

        return Object.assign({}, state, {
            handOne: handOne,
            handTwo: handTwo,
            handThree: handThree,
            handFour: handFour,
            selected: selectedArr,
        });
    } else if (action.type === actions.PLAY_CARDS) {
        var playedHand;
        var isValid = isHandValid(action.cards);

/*
if (!state.prevMove && hand.length ) {
    playedHand = hand;
} else if (hand.length !== state.prevMove.length) {
    return state;
} else {
    if (hand.length === 1 && hand[0].rank > state.prevMove[0].rank) {
        playedHand = hand;
    } else if (hand.length === 2 && hand[0].value === action.cards[1].value) {
        console.log('double');
    }
}
 */

        var players = ['handOne', 'handTwo', 'handThree', 'handFour'];
        var oldTurn = players.indexOf(state.turn);

        var currentTurn = state[state.turn].slice();
        action.cards.forEach(function(selectCard, idx) {
            currentTurn = currentTurn.filter(function(card) {
                return card !== selectCard;
            });
        });

        if (state.turn === 'handOne') {
            handOne = currentTurn;
        } else if (state.turn === 'handTwo') {
            handTwo = currentTurn;
        } else if (state.turn === 'handThree') {
            handThree = currentTurn;
        } else if (state.turn === 'handFour') {
            handFour = currentTurn;
        }
        console.log(action.hand);

        return Object.assign({}, state, {
            handOne: handOne,
            handTwo: handTwo,
            handThree: handThree,
            handFour: handFour,
            turn: players[(oldTurn + 1) % 4],
            selected: [],
            prevMove: playedHand
        });
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
                turn = 'handTwo';
            } else if (firstMove === 1) {
                turn = 'handThree';
            } else if (firstMove === 2) {
                turn = 'handFour';
            } else if (firstMove === 3) {
                turn = 'handOne';
            }
    	} else if (dealer === 2) {
    		handOne = hands[2];
    		handTwo = hands[3];
    		handThree = hands[0];
    		handFour = hands[1];
            if (firstMove === 0) {
                turn = 'handThree';
            } else if (firstMove === 1) {
                turn = 'handFour';
            } else if (firstMove === 2) {
                turn = 'handOne';
            } else if (firstMove === 3) {
                turn = 'handTwo';
            }
    	} else if (dealer === 3) {
    		handOne = hands[1];
    		handTwo = hands[2];
    		handThree = hands[3];
    		handFour = hands[0];
            if (firstMove === 0) {
                turn = 'handFour';
            } else if (firstMove === 1) {
                turn = 'handOne';
            } else if (firstMove === 2) {
                turn = 'handTwo';
            } else if (firstMove === 3) {
                turn = 'handThree';
            }
    	} else if (dealer === 4) {
    		handOne = hands[0];
    		handTwo = hands[1];
    		handThree = hands[2];
    		handFour = hands[3];
            if (firstMove === 0) {
                turn = 'handOne';
            } else if (firstMove === 1) {
                turn = 'handTwo';
            } else if (firstMove === 2) {
                turn = 'handThree';
            } else if (firstMove === 3) {
                turn = 'handFour';
            }
    	}
    	return Object.assign({}, state, {
    		hands: hands,
    		handOne: handOne,
    		handTwo: handTwo,
    		handThree: handThree,
    		handFour: handFour,
            selected: [],
            showHandOne: false,
            showHandTwo: false,
            showHandThree: false,
            showHandFour: false,
            turn: turn,
    	});
    } else if (action.type === actions.SHUFFLE_ERROR) {
        return state;
    } else {
    	return state;
    }
};

module.exports = reducers;
