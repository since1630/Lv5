const PostService = require('../services/posts.service.js');
const postsSchema = require('../schemas/posts.schema');

class PostController {
  postService = new PostService();

  findAllPost = async (req, res, next) => {
    const posts = await postService.findAllPost();
    return posts;
  };

  findUserPost = async (req, res, next) => {
    const { postId } = req.params;
    const userPost = await postService.findUserPost(postId);
    return userPost;
  };

  createPost = async (req, res, next) => {
    try {
      const { userId, nickname } = res.locals.user;
      const { title, content } = req.body;

      await postsSchema.validateAsync(req.body).catch((err) => {
        throw new Error(err.message);
      });

      await postService.createPost(userId, title, content);
      return res.status(201).json({ message: '게시글 작성에 성공하였습니다' });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errorMessage: err.message });
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { title, content } = req.body;

      await postsSchema.validateAsync(req.body).catch((err) => {
        throw new Error(err.message);
      });

      const updatePost = await postService.updatePost(
        title,
        content,
        postId,
        userId
      );
      return res.status(201).json({ message: '게시글을 수정하였습니다.' });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errorMessage: err.message });
    }
  };

  deletePost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const deletePost = await postService.deletePost(userId, postId);
      return res.status(200).json({ message: '게시글을 삭제하였습니다' });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errorMessage: err.message });
    }
  };
}

module.exports = PostController;
