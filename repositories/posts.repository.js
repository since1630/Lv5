const { Posts, Users, Likes } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('sequelize');
class PostsRepository {
  findAllPost = async () => {
    const posts = await Posts.findAll({
      attributes: [
        'postId',
        'userId',
        'title',
        'createdAt',
        'updatedAt',
        [sequelize.fn('count', sequelize.col('Likes.postId')), 'likes'],
      ],
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
        { model: Likes, attributes: [] },
      ],
      group: ['postId'],
      order: [['createdAt', 'DESC']],
      raw: true,
    });
    return posts;
  };

  findUserPost = async (postId) => {
    const post = await Posts.findOne({
      attributes: [
        'postId',
        'userId',
        'title',
        'content',
        'createdAt',
        'updatedAt',
        [sequelize.fn('count', sequelize.col('Likes.PostId')), 'likes'],
      ],
      include: [
        {
          model: Users,
          attributes: ['nickname'],
          required: true,
        },
        {
          model: Likes,
          attributes: [],
          required: false,
        },
      ],
      group: ['postId'],
      where: { postId },
      raw: true,
    });

    return post;
  };

  findPost = async (postId) => {
    const post = await Posts.findOne({ where: { postId } });
    return post;
  };

  createLikePost = async (userId, title, content) => {
    await Posts.create({ UserId: userId, title, content });
  };

  updatePost = async (title, content, postId, userId) => {
    const updatePost = await Posts.update(
      { title, content },
      { where: { [Op.and]: [{ postId }, { UserId: userId }] } }
    );
    return updatePost;
  };

  deletePost = async (userId, postId) => {
    const deletePost = await Posts.destroy({
      where: { [Op.and]: [{ postId }, { UserId: userId }] },
    });
    return deletePost;
  };
}

module.exports = PostsRepository;
