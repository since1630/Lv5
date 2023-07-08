const CommentsRepository = require('../repositories/comments.repository.js');
// const likesRepository = new LikesRepository();

class CommentsService {
  commentsRepository = new CommentsRepository();
  findAllComments = async (postId) => {
    const posts = await this.commentsRepository.findId(postId);
    if (!posts) {
      return res
        .status(404)
        .json({ errorMessage: '게시글이 존재하지 않습니다.' });
    }
    const comments = await this.commentsRepository.findAllComments(postId);
    return comments;
  };

  createComment = async (postId, userId, comment) => {
    const posts = await this.commentsRepository.findPosts(postId);
    if (!posts) {
      return res
        .status(404)
        .json({ errorMessage: '게시글이 존재하지 않습니다.' });
    }
    await this.commentsRepository.createComment(postId, userId, comment);
  };

  updateComment = async (postId, userId, comment, commentId) => {
    const posts = await this.commentsRepository.findPosts(postId);
    if (!posts) {
      return res
        .status(404)
        .json({ errorMessage: '게시글이 존재하지 않습니다.' });
    }
    const comments = await this.commentsRepository.findComments(commentId);
    if (!comments) {
      return res
        .status(404)
        .json({ errorMessage: '댓글이 존재하지 않습니다.' });
    }

    const checkCommentUpdate = await this.commentsRepository.updateComments(
      postId,
      userId,
      comment,
      commentId
    );
    if (!checkCommentUpdate) {
      return res
        .status(400)
        .json({ errorMessage: '댓글이 정상적으로 수정되지 않았습니다.' });
    }
    return res.status(201).json({ message: '댓글을 수정하였습니다.' });
  };

  deleteComment = async (postId, userId, commentId) => {
    const posts = await this.commentsRepository.findPosts(postId);
    if (!posts) {
      return res
        .status(404)
        .json({ errorMessage: '게시글이 존재하지 않습니다.' });
    }
    const comments = await this.commentsRepository.findComments(commentId);
    if (!comments) {
      return res
        .status(404)
        .json({ errorMessage: '댓글이 존재하지 않습니다.' });
    }
    const isExistCommentDelete = await this.commentsRepository.deleteComment(
      postId,
      userId,
      commentId
    );
    //! 400 댓글 삭제가 실패한 경우
    if (!isExistCommentDelete) {
      return res.status(400).json({
        errorMessage: '댓글 삭제가 정상적으로 처리되지 않았습니다.',
      });
    }
    return res.status(200).json({ message: '댓글을 삭제하였습니다.' });
  };
}

module.exports = CommentsService;
