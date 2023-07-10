const LikesRepository = require('../repositories/likes.repository.js');
// const likesRepository = new LikesRepository();

class LikesService {
  likesRepository = new LikesRepository();

  findAllPostLike = async (userId) => {
    const posts = await this.likesRepository.findAllPostLike(userId);
    const formatedPost = posts.map((post) => {
      return {
        postId: post.postId,
        userId: post.userId,
        nickname: post['User.nickname'],
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        likes: post.likes,
      };
    });
    return formatedPost;
  };

  findUserPost = async (postId) => {
    const post = await this.likesRepository.findUserPost(postId);
    return post;
  };

  findLikePost = async (userId, postId) => {
    const likePost = await this.likesRepository.findLikePost(userId, postId);
    return likePost;
  };
  createLikePost = async (userId, postId) => {
    await this.likesRepository.createLikePost(userId, postId);
  };

  deleteLikePost = async (userId, postId) => {
    await this.likesRepository.deleteLikePost(userId, postId);
  };
}

module.exports = LikesService;
