const CommentsService = require('../services/comments.service.js');
const commentsSchema = require('../schemas/comments.schema');

class CommentsController {
  commentsService = new CommentsService();
  findAllComments = async (req, res, next) => {
    const { postId } = req.params;

    try {
      const posts = await this.commentsService.findPosts(postId);
      if (!posts) {
        return res
          .status(404)
          .json({ errorMessage: '게시글이 존재하지 않습니다.' });
      }

      const comments = await this.commentsService.findAllComments(postId);
      return res.status(200).json({ comments });
    } catch (err) {
      console.error(err);
      return res
        .status(400)
        .json({ errorMessage: '댓글 조회에 실패하였습니다.' });
    }
  };

  createComment = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user;
      const { comment } = req.body;

      try {
        await commentsSchema.validateAsync(req.body);
      } catch (err) {
        console.error(err);
        return res.status(400).json({ errorMessage: err.message });
      }

      //! 게시물 못 찾을 때 에러(24자리 고정)
      const posts = await this.commentsService.findPosts(postId);
      if (!posts) {
        return res
          .status(404)
          .json({ errorMessage: '게시글이 존재하지 않습니다.' });
      }
      await this.commentsService.createComment(userId, postId, comment);
      return res.status(201).json({ message: '댓글을 작성하였습니다.' });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errorMessage: err.message });
    }
  };

  updateComment = async (req, res, next) => {
    try {
      const { postId, commentId } = req.params;
      const { userId } = res.locals.user;
      const { comment } = req.body;

      try {
        await commentsSchema.validateAsync(req.body);
      } catch (err) {
        console.error(err);
        return res.status(400).json({ errorMessage: err.message });
      }

      //! 게시물 못 찾을 때 에러(24자리 고정)
      const posts = await this.commentsService.findPosts(postId);
      if (!posts) {
        return res
          .status(404)
          .json({ errorMessage: '게시글이 존재하지 않습니다.' });
      }

      //! 댓글을 못 찾을 때 에러(24자리 고정)
      const comments = await this.commentsService.findComments(commentId);
      if (!comments) {
        return res
          .status(404)
          .json({ errorMessage: '댓글이 존재하지 않습니다.' });
      }

      //! 권한이 없을 때 (토큰의 유저 아이디 활용)
      if (comments.UserId !== userId) {
        return res
          .status(403)
          .json({ errorMessage: '댓글의 수정 권한이 존재하지 않습니다.' });
      }
      const updateComment = await this.commentsService.updateComment(
        postId,
        userId,
        comment,
        commentId
      );

      //! 400 댓글 수정이 실패한 경우
      if (!updateComment) {
        return res
          .status(400)
          .json({ errorMessage: '댓글이 정상적으로 수정되지 않았습니다.' });
      }
      return res.status(201).json({ message: '댓글을 수정하였습니다.' });
    } catch (err) {
      console.error(err);
      return res
        .status(400)
        .json({ errorMessage: '댓글 수정에 실패하였습니다.' });
    }
  };

  deleteComment = async (req, res, next) => {
    try {
      const { postId, commentId } = req.params;
      const { userId } = res.locals.user;

      //! 게시물 못 찾을 때 에러(24자리 고정)
      const posts = await this.commentsService.findPosts(postId);
      if (!posts) {
        return res
          .status(404)
          .json({ errorMessage: '게시글이 존재하지 않습니다.' });
      }
      //! 댓글을 못 찾을 때 에러(24자리 고정)
      const comments = await this.commentsService.findComments(commentId);
      if (!comments) {
        return res
          .status(404)
          .json({ errorMessage: '댓글이 존재하지 않습니다.' });
      }
      //! 권한이 없을 때 (토큰의 유저 아이디 활용)
      if (comments.UserId !== userId) {
        return res
          .status(403)
          .json({ errorMessage: '댓글의 수정 권한이 존재하지 않습니다.' });
      }
      const deleteComment = await this.commentsService.deleteComment(
        postId,
        userId,
        commentId
      );
      //! 400 댓글 수정이 실패한 경우
      if (!deleteComment) {
        return res
          .status(400)
          .json({ errorMessage: '댓글이 정상적으로 삭제되지 않았습니다.' });
      }
      return res.status(200).json({ message: '댓글을 삭제하였습니다.' });
    } catch (err) {
      console.error(err);
      return res
        .status(400)
        .json({ errorMessage: '댓글 삭제에 실패하였습니다.' });
    }
  };
}

module.exports = CommentsController;
