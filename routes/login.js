const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/login.controller');
const loginController = new LoginController();

// 로그인 API
router.post('/', loginController.login);

module.exports = router;
