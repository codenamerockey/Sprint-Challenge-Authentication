const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users_model.js');
const secrets = require('../config_secret/secrets.js');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  console.log(user);
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(savedUser => {
      //jwt should be generated
      const token = generateToken(savedUser);
      console.log(savedUser);
      res.status(201).json({
        user: savedUser,
        token
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'cannot add the user', ...error });
    });
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // produce token
        const token = generateToken(user);

        // add token to response
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    username: user.username,
    subject: user.id
  };
  const options = {
    expiresIn: '1h'
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
