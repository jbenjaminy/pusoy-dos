var fetch = require('isomorphic-fetch');

var PAGE_LOAD = 'PAGE_LOAD';
var pageLoad = function() {
    return {
        type: PAGE_LOAD
    };
};

/*----------- EXPORTS ----------*/
exports.PAGE_LOAD = PAGE_LOAD;
exports.pageLoad = pageLoad;