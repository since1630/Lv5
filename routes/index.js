const express = require('express');
const router = express.Router();
// const comments = require("./comments");
const posts = require('./posts');
const signup = require('./signup');
const login = require('./login');
const likes = require('./likes');
const comments = require('./comments');

router.use('/signup', signup);
router.use('/login', login);
router.use('/posts', [likes, posts, comments]);

module.exports = router;
