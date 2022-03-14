const User = require('../../models/User');
const hash = require('../../routes/hush');

module.exports = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).send({ err: "'Wrong credentials!'" });

    const { hashed } = await hash(req.body.password, user.salt);

    if (user.password !== hashed) {
      return res.status(401).send({ err: "'Wrong credentials!'" });
    }

    return res.status(200).send('authorized');
  } catch (err) {
    res.status(400).json('unauthorized');
  }
};
