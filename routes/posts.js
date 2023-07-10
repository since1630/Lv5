const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middlewares.js');
const PostController = require('../controllers/posts.controller');
const postController = new PostController();

//게시글 전체 조회
router.get('/', postController.findAllPost);

// 게시글 상세 조회
router.get('/:postId', postController.findUserPost);

// 게시글 작성
router.post('/', authMiddleware, postController.createPost);

// 게시글 수정
router.put('/:postId', authMiddleware, postController.updatePost);

// 게시글 삭제
router.delete('/:postId', authMiddleware, postController.deletePost);

module.exports = router;
