const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth-middlewares');
const CommentController = require('../controllers/comments.controllers');
const commentController = new CommentController();

//? 댓글 조회
router.get('/:postId/comments', commentController.findAllComments);

router.post(
  '/:postId/comments',
  authMiddleware,
  commentController.createComment
);
router.put(
  '/:postId/comments/:commentId',
  authMiddleware,
  commentController.updateComment
);
router.delete(
  '/:postId/comments/:commentId',
  authMiddleware,
  commentController.deleteComment
);

module.exports = router;
