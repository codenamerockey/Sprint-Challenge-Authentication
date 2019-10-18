const express = require('express');
const router = express.Router();
const restricted = require('../auth/authenticate-middleware.js');
const Users = require('./users_model.js');

router.get('/', restricted, (req, res) => {
  //if the user is hr they can see all users
  // if the user isn't hr they can only see themselves

  Users.find()
    .then(users => {
      res.json({ loggedInUser: req.username, users });
    })
    .catch(err => {
      res.status(500).json({
        message: 'There was a problem getting the users from the database'
      });
    });
});

module.exports = router;
