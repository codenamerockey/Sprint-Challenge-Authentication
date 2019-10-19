/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');

const secrets = require('../config_secret/secrets.js');

//1. see if there is a token

//2. check if it is valid =>
//  rehash the header + payload + secret and see if it matches our        verified signature. // this makes sure our token has not been         tampered with. ***done by library***

//3. Extract the username or user id or department or what ever user specific data you might need to verify.

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    // check that the token is valid
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        // not valid
        res.status(401).json({ message: 'you shall not pass!' });
      } else {
        // token is valid
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'No token provided' });
  }
};
