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

    return true;
}

function whatHand(hand) {
    var isStraight = true;
    var isFlush = true;
    var isFullHouse = true;
    var isFour = true;

    var straightFlush = 7;
    var fourOfKind = 6;
    var fullHouse = 5;
    var flush = 4;
    var straight = 3;
    var triple = 2;
    var pair = 1;
    var single = 0;

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
            value = parseInt(card.value);
        }

        values.push(value);
    });

    var suits = [];
    hand.forEach(function(card) {
        suits.push(card.suit);
    });

    values.sort(function(a, b) {
        return a > b;
    });

    if (hand.length === 1) {
        return {
            suit: suits[0],
            high: hand[0].rank,
            rank: single,
        }
    } else if (hand.length === 2) {
        var highCard = high[0].rank > high[1].rank ? high[0] : high[1];
        return {
            suit: null,
            high: highCard,
            rank: pair,
        }
    } else if (hand.length === 3) {
        var highCard = high[0].rank > high[1].rank ? high[0] : high[1];
        highCard = highCard.rank > high[2].rank ? highCard : high[2];
        return {
            suit: highCard.suit,
            high: highCard.rank,
            rank: triple,
        }
    } else if (hand.length === 5) {
        // CHECKS FOR STRAIGHT
        var straightVal = values[0];
        for (var i = 0; i < values.length; i += 1) {
            if (values[i] !== straightVal) {
                isStraight = false;
                break;
            }

            straightVal += 1;
        }

        // CHECKS FOR FLUSH
        var flushSuit = suits[0];
        for (var i = 0; i < suits.length; i += 1) {
            if (suits[i] !== flushSuit) {
                isFlush = false;
                break;
            }
        }

        // CHECKS FOR FULL HOUSE
        var numOne = values[4];
        var numTwo = values[0];
        var over = values.filter(function(value) {
            return value === numOne;
        });

        var under = values.filter(function(value) {
            return value === numTwo;
        });

        if (!((over.length === 3 && under.length === 2) || (over.length === 2 && under.length === 3))) {
            isFullHouse = false;
        }

        var overVal;
        if (over.length === 3) {
            overVal = numOne;
        }

        if (under.length === 3) {
            overVal = numTwo;
        }

        // CHECKS FOR FOUR OF A KIND
        var highCheck = values.filter(function(value) {
            return value === values[4];
        });

        var lowCheck = values.filter(function(value) {
            return value === values[0];
        });

        var quadNum;
        if (!(highCheck.length === 4 || lowCheck.length === 4)) {
            isFour = false;
        }

        if (highCheck.length === 4) {
            quadNum = values[4];
        } else if (lowCheck.length === 4) {
            quadNum = values[0];
        }
    }

    if (isStraight && isFlush) {
        return {
            suit: flushSuit,
            high: values[4],
            rank: straightFlush,
        }
    } else if (isFour) {
        return {
            suit: null,
            high: quadNum,
            rank: fourOfKind,
        }
    } else if (isFullHouse) {
        return {
            suit: null,
            high: overVal,
            rank: fullHouse,
        }
    } else if (isFlush) {
        return {
            suit: flushSuit,
            high: values[4],
            rank: flush,
        }
    } else if (isStraight) {
        return {
            suit: null,
            high: values[4],
            rank: straight,
        }
    } else {
        return {
            suit: null,
            high: null,
            rank: null,
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
        var handRank = whatHand(action.cards);
        console.log(isValid);

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
