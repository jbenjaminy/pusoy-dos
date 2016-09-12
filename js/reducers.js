var actions = require('./actions');

var reducers = function(state, action) {
    state = state || {};

    if (action.type === actions.PAGE_LOAD) {
        return Object.assign({}, { 
        });
    } else {
        return state;
    }
};

module.exports = reducers;