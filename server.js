/* DEPENDENCIES */
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var express = require('express');

var app = express();

/* SERVE FRONTEND */
app.use(express.static('build/'));

/* RESPONSE HEADERS */
app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods", "PUT");
  next();
});

/* ENDPOINTS */
app.get('/new_game', function(request, response) {
  return response.json();
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