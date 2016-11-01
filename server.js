/* DEPENDENCIES */
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var express = require('express');
var unirest = require('unirest');
var events = require('events');

/* DEFINE API CALLS */
var getFromApi = function(endpoint, args) {
    var emitter = new events.EventEmitter();
    unirest.get('http://deckofcardsapi.com/api/deck/' + endpoint)
           .qs(args)
           .end(function(response) {
                if (response.ok) {
                    emitter.emit('end', response.body);
                }
                else {
                    emitter.emit('error', response.code);
                }
            });
    return emitter;
};

/* DEFINE APP */
var app = express();

/* SERVE FRONTEND FROM BACKEND */
app.use(express.static('build/'));

/* RESPONSE HEADERS */
app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods", "PUT");
  next();
});

/* ENDPOINTS */
app.get('/shuffle', function(request, response) {
  // define empty array of hands for four players
  var hands = [[], [], [], []];
  var firstMove = null;
  // shuffles existing deck of cards
  var shuffleDeck = getFromApi('29n7cw92l259/shuffle', {
  });
  shuffleDeck.on('end', function(shuffledDeck) {
    // draws all 52 cards from shuffled deck, returning an object for each -- to be dealt
    var dealCards = getFromApi('29n7cw92l259/draw', {
      count: 52
    });
    dealCards.on('end', function(dealtDeck) {
      var cards = dealtDeck.cards;
      cards.forEach(function(card, index) {
        var value = card.value;
        var suit = card.suit
        var rank = '';
      // sets up a ranking for each card (e.g., rank for 3C = 1, 3S = 2, 3H = 3, 3D = 4, ... 2D = 52)
        // gives numerical ranks for cards with non-numerical values (within single suit)
        if (value === 'JACK') {
          rank = '11';
        } else if (value === 'QUEEN') {
          rank = '12';
        } else if (value === 'KING') {
          rank = '13';
        } else if (value === 'ACE') {
          rank = '14';
        } else if (value === '2') {
          rank = '15';
        } else {
          rank = value;
        }
        // adjusts '3' to be the lowest rank within each suit
        rank = parseInt(rank) - 2;
        // adjusts rankings to span all suits
        rank = rank * 4;
        if (suit === 'CLUBS') {
          rank = rank - 3;
        } else if (suit === 'SPADES') {
          rank = rank - 2;
        } else if (suit === 'HEARTS') {
          rank = rank - 1;
        }
        // get index for hand containing the lowest card (3C) for first move 
        if (rank === 1) {
          firstMove = index%4
        }
        // sets 'rank' & 'selected' properties within each card object
        card.rank = rank;
        card.selected = false;
        // 'deals' each card in order, alternating to next 'hand' array with each increase of index
        hands[index%4].push(card);
      });
      console.log('hands -->', hands);
      // returns populated hands array
      response.json({'hands': hands, 'firstMove': firstMove});
    });
  // error handling
    dealCards.on('error', function(error) {
      console.error(code);
      response.sendStatus(error);
    });
  });
  shuffleDeck.on('error', function(error) {
      console.error(code);
      response.sendStatus(error);
  });
});

/* SERVER SET-UP */
var runServer = function(callback) {
    var port = process.env.PORT || 8080;
    var server = app.listen(port, function() {
        console.log('Listening on port ' + port);
        if (callback) {
            callback(server);
        }
    });
};
/* RUN SERVER */
if (require.main === module) {
  runServer();
}

/* EXPORTS */
exports.app = app;
exports.runServer = runServer;