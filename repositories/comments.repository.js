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
      where: { [Op.and]: { postId } },
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
    const [isExistCommentUpdate] = await Comments.update(
      { comment },
      {
        where: {
          [Op.and]: [{ PostId: postId }, { UserId: userId }, { commentId }],
        },
      }
    );
    return isExistCommentUpdate;
  };

  deleteComment = async (postId, userId, commentId) => {
    const isExistCommentDelete = await Comments.destroy({
      where: {
        [Op.and]: [{ PostId: postId }, { UserId: userId }, { commentId }],
      },
    });

    return isExistCommentDelete;
  };
}

module.exports = CommentsRepository;

//     //! 게시물 못 찾을 때 에러(24자리 고정)
//     const posts = await Posts.findOne({ where: { postId } });
//     if (!posts) {
//       return res
//         .status(404)
//         .json({ errorMessage: '게시글이 존재하지 않습니다.' });
//     }
//     //! 댓글을 못 찾을 때 에러(24자리 고정)
//     const comments = await Comments.findOne({ where: { commentId } });
//     if (!comments) {
//       return res
//         .status(404)
//         .json({ errorMessage: '댓글이 존재하지 않습니다.' });
//     }
//     //! 권한이 없을 때 (토큰의 유저 아이디 활용)
//     if (comments.UserId !== userId) {
//       return res
//         .status(403)
//         .json({ errorMessage: '댓글의 수정 권한이 존재하지 않습니다.' });
//     }
