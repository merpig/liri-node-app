var axios = require("axios");
var fs = require("fs");

var ConcertThis = function() {

    this.search = function(query) {
        console.log(query);
    }
}

module.exports = ConcertThis;