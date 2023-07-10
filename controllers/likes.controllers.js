const LikesService = require('../services/likes.service.js');
const PostsService = require('../services/posts.service.js');
class LikesController {
  likesService = new LikesService();

  //* 좋아요 게시물 조회
  findAllPostLike = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;

      const posts = await this.likesService.findAllPostLike(userId);
      if (posts.length === 0) {
        return res
          .status(404)
          .json({ errorMassage: '좋아요를 한 게시물이 없습니다.' });
      }
      return res.status(200).json({ posts });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errorMessage: err.message });
    }
  };

  //* 게시글 좋아요 하기
  likePost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;

      //! 게시글이 존재하지 않는 경우
      const post = await this.likesService.findUserPost(postId);
      if (!post) {
        return res
          .status(404)
          .json({ errorMessage: '게시글이 존재하지 않습니다.' });
      }
      const like = await this.likesService.findLikePost(userId, postId);

      if (!like) {
        await this.likesService.createLikePost(userId, postId);
        return res
          .status(200)
          .json({ message: '게시글의 좋아요를 등록하였습니다.' });
      } else {
        await this.likesService.deleteLikePost(userId, postId);
        return res
          .status(200)
          .json({ message: '게시글의 좋아요를 취소하였습니다.' });
      }
    } catch (err) {
      console.error(err);
      return res
        .status(400)
        .json({ errorMessage: '게시글 좋아요에 실패하였습니다.' });
    }
  };
}

module.exports = LikesController;
