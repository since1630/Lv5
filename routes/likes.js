const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middlewares');
const LoginController = require('../controllers/likes.controllers.js');
const loginController = new LoginController();

router.get('/like', authMiddleware, loginController.findAllPostLike);
router.put('/:postId/like', authMiddleware, loginController.likePost);

module.exports = router;
