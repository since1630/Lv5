const { Users, Posts, Likes } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('sequelize');
class LikesRepository {
  findAllPostLike = async (userId) => {
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
  // const like = await this.likesService.findLikePost(postId, userId);
  findUserPost = async (postId) => {
    const post = await Posts.findOne({ where: { postId } });
    return post;
  };

  findLikePost = async (userId, postId) => {
    const like = await Likes.findOne({
      where: { [Op.and]: [{ PostId: postId }, { UserId: userId }] },
    });

    return like;
  };

  createLikePost = async (userId, postId) => {
    await Likes.create({ UserId: userId, PostId: postId });
  };

  deleteLikePost = async (userId, postId) => {
    await Likes.destroy({
      where: { [Op.and]: [{ UserId: userId }, { PostId: postId }] },
    });
  };
}

module.exports = LikesRepository;
