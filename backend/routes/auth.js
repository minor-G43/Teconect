const express = require('express');

const router = express.Router();

const part = require('../controllers/auth');

router.route('/register').post(part.register);

router.route('/login').post(part.login);

router.route('/forgotpassword').post(part.forgotpassword);

router.route('/password-reset/:resetToken').put(part.resetpassword);


module.exports = router; 