const User = require('../../models/User');
const hash = require('../../routes/hush');
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()[0].msg,
    });
  }
  try {
    const { hashed: password, salt } = await hash(req.body.password);
    const userObj = { ...req.body, salt, password };
    const user = new User(userObj);
    await user.save();
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};
