const jwt = require('jsonwebtoken');

var secretKey = require('../config/config').secretKey;

// getAuthToken() {
//     var token = jwt.sign({ foo: 'bar' }, secretKey, { algorithm: 'RS256'});
// }
jwt.sign({ foo: 'bar' }, secretKey, { algorithm: 'RS256' }, function(err, token) {
    console.log(token);
});