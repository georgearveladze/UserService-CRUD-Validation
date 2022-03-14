const login = require('../controllers/user/login');
const signup = require('../controllers/user/register');
const updater = require('../controllers/user/update');
const basicAuth = require('../middlewares/userauthcontroler/authControler');
const { Router } = require('express');
const router = Router();
const validator = require('../utils/uservalidation/validation');
const paginatedResults = require('../controllers/user/pagination');
const userdelete = require('../controllers/user/userdelete');

router.post('/signup', validator, signup);

router.post('/login', login);

router.put('/update', basicAuth, updater);

router.get('/list', paginatedResults);

router.delete('/delete', basicAuth, userdelete);

module.exports = router;
