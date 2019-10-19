module.exports = {
  jwtSecret:
    process.env.JWT_SECRET ||
    'Shhhh..lets keep this information safe and secure.'
};
