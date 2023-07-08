const CommentsService = require('../services/comments.service.js');
const commentsSchema = require('../schemas/comments.schema');

class CommentsController {
  commentService = new CommentsService();
  findAllComments = async (req, res, next) => {
    const { postId } = req.params;

    await commentsSchema.validateAsync(req.body).catch((err) => {
      console.error(err);
      return res
        .status(400)
        .json({ errorMessage: '댓글 작성에 실패하였습니다.' });
    });

    const comments = await commentService.findAllComments(postId);
    return res.status(200).json({ comments });
  };

  createComment = async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;
    const { comment } = req.body;
    await commentService.createComment(userId, postId, comment);
  };

  updateComment = async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { comment } = req.body;
    const { userId } = res.locals.user;
    await commentService.updateComment(userId, postId, comment, commentId);
  };

  deleteComment = async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { userId } = res.locals.user;
    await commentService.deleteComment(userId, postId, commentId);
  };
}

module.exports = CommentsController;
