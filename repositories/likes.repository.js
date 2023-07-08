const { Users, Posts, Likes } = require('../models');
const { Op } = require('sequelize');
class LikesRepository {
  findAllPostLike = async (userId) => {
    const { userId } = res.locals.user;

    const posts = await Posts.findAll({
      attributes: [
        'postId',
        'userId',
        'title',
        'createdAt',
        'updatedAt',
        [sequelize.fn('count', sequelize.col('Likes.postId')), 'likes'],
      ],
      include: [{ model: Likes, attributes: [], required: false }],
      group: ['postId'],
      where: {
        postId: {
          [Op.in]: sequelize.literal(
            `(select postId from Likes where UserId =${userId})`
          ),
        },
      },
      raw: true,
    });
    return posts;
  };

  likePost = async (userId, postId) => {
    const like = await Likes.findOne({
      where: { [Op.and]: [{ PostId: postId }, { UserId: userId }] },
    });
    return like;
  };

  createPost = async (userId, postId) => {
    return await Likes.create({ UserId: userId, PostId: postId });
  };

  deletePost = async (userId, postId) => {
    return await Likes.destroy({
      where: { [Op.and]: [{ PostId: postId }, { UserId: userId }] },
    });
  };
}

module.exports = LikesRepository;
