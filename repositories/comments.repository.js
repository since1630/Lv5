const { Users, Comments, Posts } = require('../models');
const { Op } = require('sequelize');

class CommentsRepository {
  findAllComments = async (postId) => {
    const comments = await Comments.findAll({
      attributes: ['commentId', 'userId', 'comment', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
      ],
      where: { PostId: postId },
      order: [['createdAt', 'DESC']],
    });

    return comments;
  };

  findPosts = async (postId) => {
    const posts = await Posts.findOne({ where: { postId } });
    return posts;
  };

  findComments = async (commentId) => {
    const comments = await Comments.findOne({ where: { commentId } });
    return comments;
  };

  createComment = async (userId, postId, comment) => {
    await Comments.create({ UserId: userId, PostId: postId, comment });
  };

  updateComment = async (postId, userId, comment, commentId) => {
    const [checkCommentUpdate] = await Comments.update(
      { comment },
      {
        where: {
          [Op.and]: [{ PostId: postId }, { UserId: userId }, { commentId }],
        },
      }
    );

    return checkCommentUpdate;
  };

  deleteComment = async (postId, userId, commentId) => {
    const checkCommentDelete = await Comments.destroy({
      where: {
        [Op.and]: [{ PostId: postId }, { UserId: userId }, { commentId }],
      },
    });

    return checkCommentDelete;
  };
}

module.exports = CommentsRepository;
