Pusoy Dos rules: https://en.wikipedia.org/wiki/Pusoy_dos
Deck of Cards API: http://deckofcardsapi.com/

## TO-DO:
	# PRIORITIES:
		1) Fix select/unselect cards.
		2) Add buttons to board to play cards/skip turn
		3) Write adjustments for discarding played cards (should we use 'piles' from Deck of Cards API?)
		4) Write game logic.
		5) Sort cards in each hand by ranking.
		6) Move all logic to backend. 
		7) Implement socket.io
		8) Refactor!!!

	# ADDITIONAL FEATURES:
		1) Integrate hands, wins, turn, etc. into state.players objects
		2) Get rid of 'view cards' button and just click on card backs instead to open/close hand.
		3) Make ULs expand when viewing player 2 & player 4's cards.
		4) Input player's names/store as state.

<!-- Play cards pseudo-code -->
-check that first move of game includes three of clubs.
	-can play three of clubs as single, pair, three card hand or five card hand:
	-whatever category is for first move, SET STATE at the start of the set:
		-numCards (per move)
		-lastHand (cards stored in array for comparing next move; shown in middle of board)
-each player continues acting clockwise: may make valid move or pass:
	-for a valid move, number of cards played must = state.numCards, and card rankings must be > than rankings for lastHand
	-maybe set state for 'passes' as well.
	-if state.passes = 3, last player to play cards will start off the next set
	-at the end of a set, SET STATE:
		-turn (last player to act)
		-numCards (reset, e.g. null)
		-lastHand (reset, e.g. null)
-at the start of each set, player again has option of playing 1, 2, 3 or 5 card hand of any ranking:
	-SET STATE for numCards and lastHand
-first player with no cards remaining wins game:
	-SET STATE
		-should credit them with a win (NEED TO CONNECT THIS TO STATE):
		-should set inGame back to false
		-should advance dealer to next player
	-render another start game button to dispatch actions.startGame & actions.shuffleCards
		-this will reshuffle cards and deal hands from new dealer position.

-logic for comparing hands
	*look at card value first (3s are lowest ... kings, aces, twos are highest), then look at suits to compare cards of same value (suit order: clubs (lowest), spades, hearts, diamonds) -- 3C is lowest card in deck, 2D is highest
	-if numCards = 1:
		-just compare card.rank > lastHand[0].rank
	-if numCards = 2 or 3:
		-check that both (or all three cards) have same value
		-again, any card.rank in pair or trips > any card.rank from last hand
	-if numCards = 5 
		-check that each move fits into one of the categories (maybe set state for the category of previous hand also -- 1 through 5 (e.g., 1 = straight, 2 = flush, 3 = full house, 4 = four of a kind, 5 = straight flush))?
		-any higher category automatically beats previous move
		-if move is same category as previous move:
			-for straights/flushes/straight flushes:
				just sort cards in move and in previous move and compare card.rank of highest card
			-for full House/four of a kind:
				find out which card value equals 3 or 4 of the cards in the hand, and compare the ranking of any of those with the ranking of any of the equiv. in the last hand.

Details from wiki:
"Single card: Cards rank from 2 (highest) to 3 (lowest). Between cards of the same rank, the higher suit beats the lower suit. That is, a 5♦ beats a 5♥.

Pair: A pair of equally ranked cards. Between pairs of the same rank, the pair with the higher suit wins. That is, a 7♠-7♦ beats a 7♥-7♣.

Three of a kind: Three equally ranked cards. This is a variation of game play and may be excluded or included as a valid card combination.

Five-card hand: Any five-card combination following the poker hand rankings. From highest to lowest, valid poker hands include:

    Royal flush (ten to ace with the same suits)
    Straight flush (any straight cards with the same suit)
    Four of a kind (plus an additional card/a Kicker)
    Full House (any three cards of the same number with any two cards of the same number)
    Flush (same suit)
    Straight (any straight cards)"



