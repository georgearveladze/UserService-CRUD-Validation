const hash = require('../../routes/hush');

const User = require('../../models/User');
const basicAuth = async function (req, res, next) {
  const basicAuthorizationParams = req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(basicAuthorizationParams, 'base64').toString(
    'ascii'
  );
  const [username, password] = credentials.split(':');
  const user = await User.findOne({ username });
  if (user === null) {
    return res.status(400).send({
      message: 'This username dont exists',
    });
  }
  const salt = user.salt;
  const { hashed } = await hash(password, salt);
  if (hashed !== user.password) {
    return res.status(400).send({
      message: 'This password dont correct',
    });
  }
  req.updatedUserUsername = username;
  next();
};

module.exports = basicAuth;
