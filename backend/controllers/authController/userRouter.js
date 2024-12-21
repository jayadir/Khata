const express = require('express');
const router = express.Router();
const controller = require('./userController');
router.post('/signup',controller.signup);
router.post('/login',controller.login);
router.post('/refresh',controller.loginWithRefreshToken);
router.post('/logout',controller.logout);
module.exports = router;