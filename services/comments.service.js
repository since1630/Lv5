const CommentsRepository = require('../repositories/comments.repository.js');
class CommentsService {
  commentsRepository = new CommentsRepository();

  findAllComments = async (postId) => {
    const comments = await this.commentsRepository.findAllComments(postId);
    return comments;
  };

  findPosts = async (postId) => {
    const posts = await this.commentsRepository.findPosts(postId);
    return posts;
  };

  findComments = async (commentId) => {
    const comments = await this.commentsRepository.findComments(commentId);
    return comments;
  };

  createComment = async (postId, userId, comment) => {
    await this.commentsRepository.createComment(postId, userId, comment);
  };

  updateComment = async (postId, userId, comment, commentId) => {
    const checkCommentUpdate = await this.commentsRepository.updateComment(
      postId,
      userId,
      comment,
      commentId
    );
    return checkCommentUpdate;
  };

  deleteComment = async (postId, userId, commentId) => {
    const checkCommentDelete = await this.commentsRepository.deleteComment(
      postId,
      userId,
      commentId
    );

    return checkCommentDelete;
  };
}

module.exports = CommentsService;
