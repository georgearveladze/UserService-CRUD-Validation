const hash = require('../../routes/hush');
const User = require('../../models/User.js');

const updater = async (req, res) => {
  const data = {};
  if (req.body.password) {
    const { passwordHash, salt } = await hash(req.body.password);
    data.password = passwordHash;
    data.salt = salt;
  }
  const ifUnmodifiedSince = req.headers['if-unmodified-since'];
  const users = await Users.findOne({
    nickname: req.userNickname,
  }).exec();

  if (ifUnmodifiedSince && new Date(ifUnmodifiedSince) <= user.updated_at) {
    return res
      .status(304)
      .send({ message: 'Requested resource has not been modified' });
  }
  data.firstname = req.body.firstname;
  data.lastname = req.body.lastname;
  data.username = req.body.username;
  const updatedUserUsername = req.updatedUserUsername;
  const user = await User.findOneAndUpdate(
    { username: updatedUserUsername },
    data
  );
  return res.status(200).send({ user });
};
module.exports = updater;
