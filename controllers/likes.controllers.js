const LikesService = require('../services/signup.service.js');

class LikesController {
  likeService = new LikesService();

  findAllPostLike = async (req, res, next) => {
    const { userId } = res.locals.user;
    const posts = await likeService.findAllPost(userId);

    if (posts.length === 0) {
      return res
        .status(404)
        .json({ errorMassage: '좋아요를 한 게시물이 없습니다.' });
    }
    return res.status(200).json({ posts });
  };

  likePost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;

    const like = await this.likeService.likePost(postId, userId);
    console.log('Controllerlike:', like);
    return res.status(200).json({ data: like });

    // const like = await this.likeService.createLike
  };
}

module.exports = LikesController;
