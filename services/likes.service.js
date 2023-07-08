const LikesRepository = require('../repositories/likes.repository.js');
// const likesRepository = new LikesRepository();

class LikesService {
  likesRepository = new LikesRepository();

  findAllPostLike = async (userId) => {
    const allPosts = await postsRepository.findAllPostLike(userId);

    if (allPosts.length === 0) {
      //   res.status(404).json({ errormassage: '좋아요를 한 게시물이 없습니다.' });
      return allPosts;
    }

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

  likePost = async (postId, userId) => {
    const post = await this.likesRepository.findId(postId);
    //! 게시글이 존재하지 않는 경우
    if (!post) {
      return res
        .status(404)
        .json({ errorMessage: '게시글이 존재하지 않습니다.' });
    }

    const like = await this.likeRepository.likePost(postId, userId);
    console.log('Servicelike:', like);
    if (!like) {
      await likesRepository.createPost(postId, userId);
      //   return res
      //     .status(200)
      //     .json({ message: '게시글의 좋아요를 등록하였습니다.' });
    } else {
      await likesRepository.destroy(postId, userId);
      //   return res
      //     .status(200)
      //     .json({ message: '게시글의 좋아요를 취소하였습니다.' });
    }
  };
}

module.exports = LikesService;

// try {
//   const { userId } = res.locals.user;
//   const { postId } = req.params;
//   const post = Posts.findOne({ where: { PostId: postId } });

//   //! 게시글이 존재하지 않는 경우
//   if (!post) {
//     return res
//       .status(404)
//       .json({ errorMessage: '게시글이 존재하지 않습니다.' });
//   }

//   const like = await Likes.findOne({
//     where: { [Op.and]: [{ PostId: postId }, { UserId: userId }] },
//   });
//   //! 게시글 좋아요 등록 성공 or 등록 실패
//   if (!like) {
//     await Likes.create({ UserId: userId, PostId: postId });
//     return res
//       .status(200)
//       .json({ message: '게시글의 좋아요를 등록하였습니다.' });
//   } else {
//     await Likes.destroy({
//       where: { [Op.and]: [{ PostId: postId }, { UserId: userId }] },
//     });
//     return res
//       .status(200)
//       .json({ message: '게시글의 좋아요를 취소하였습니다.' });
//   }
// } catch (err) {
//   console.error(err);
//   return res
//     .status(400)
//     .json({ errorMessage: '게시글 좋아요에 실패하였습니다.' });
// }
