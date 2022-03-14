const User = require('../../models/User');
const Users = require('../../models/User.js');

module.exports = async (req, res) => {
  const filter = { username: req.updatedUserUsername };
  const deletedUser = await Users.delete(filter).catch((err) => {
    return res.status(500).render('error', { error: err });
  });
  return res.status(200).json({
    message: 'User is deleted',
  });
};
