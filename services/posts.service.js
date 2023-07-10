const PostsRepository = require('../repositories/posts.repository.js');

class PostsService {
  postsRepository = new PostsRepository();
  findAllPost = async () => {
    const allPosts = await this.postsRepository.findAllPost();
    const formatedPost = allPosts.map((post) => {
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
    const userPost = await this.postsRepository.findUserPost(postId);
    const formatedPost = {
      postId: userPost.postId,
      userId: userPost.userId,
      nickname: userPost['User.nickname'],
      title: userPost.title,
      content: userPost.content,
      createdAt: userPost.createdAt,
      updatedAt: userPost.updatedAt,
      likes: userPost.likes,
    };
    return formatedPost;
  };

  findPost = async (postId) => {
    const post = await this.postsRepository.findPost(postId);
    return post;
  };

  createPost = async (userId, title, content) => {
    await this.postsRepository.createPost(userId, title, content);
  };

  updatePost = async (title, content, postId, userId) => {
    try {
      const { updatePost } = await this.postsRepository.updatePost(
        title,
        content,
        postId,
        userId
      );
      return updatePost;
    } catch (err) {
      console.error(err);
    }
  };
  deletePost = async (postId, userId) => {
    try {
      const { deletePost } = await this.postsRepository.deletePost(
        postId,
        userId
      );
      return deletePost;
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = PostsService;
